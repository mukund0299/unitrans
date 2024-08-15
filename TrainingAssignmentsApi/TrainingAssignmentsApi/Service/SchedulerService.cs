using System;
using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.Service;

public class SchedulerService : ISchedulerService
{
    bool ISchedulerService.DeleteAssignments(DateOnly date)
    {
        throw new NotImplementedException();
    }

    List<Assignment> ISchedulerService.GenerateAssignments(IList<TrainingRequest> requests, IDictionary<BusType, int> capacities)
    {
        var sortedTrainingSchedules = requests.OrderBy(x => x.StartTime);

        var generatedSchedules = new List<Assignment>();
        var sortedQueueOfAssignedSchedules = new Dictionary<BusType, PriorityQueue<int, DateTime>>();
        var nextBusNumberByBusType = new Dictionary<BusType, int>();

        foreach (var schedule in sortedTrainingSchedules)
        {
            // Try to find an available bus from any of the requested bus types
            foreach (var busType in schedule.BusTypes) {
                if (!sortedQueueOfAssignedSchedules.TryGetValue(busType, out var currentAssignmentsForBusType)) {
                    // No buses of this type have yet been assigned, maybe look for another
                    continue; 
                }

                if (!currentAssignmentsForBusType.TryPeek(out int busNumber, out DateTime earliestEndTime)) {
                    // TODO: clean this up with exception
                    continue; // Should never be possible, but can't hurt 
                }

                if (schedule.StartTime < earliestEndTime) {
                    // The earliest bus available is not available soon enough
                    continue; 
                }

                // It's a match!
                generatedSchedules.Add(new Assignment(schedule.Requestor, schedule.StartTime, schedule.EndTime, busNumber, busType));

                // Update the queue to match the new endtime
                sortedQueueOfAssignedSchedules[busType].DequeueEnqueue(busNumber, schedule.EndTime);
            }

            // No existing bus matches our needs, let's make a new one
            // Let's choose the first preference bus type
            var chosenBusType = schedule.BusTypes[0];

            // See if it's already got a queue
            if (!sortedQueueOfAssignedSchedules.TryGetValue(chosenBusType, out PriorityQueue<int, DateTime>? queue))
            {
                // Yay new bus type, let's make a queue for it
                queue = new PriorityQueue<int, DateTime>();
                sortedQueueOfAssignedSchedules[chosenBusType] = queue;
            }

            nextBusNumberByBusType.TryGetValue(chosenBusType, out int nextBusNumber);
            
            // New bus or bus type!
            generatedSchedules.Add(new Assignment(schedule.Requestor, schedule.StartTime, schedule.EndTime, nextBusNumber, chosenBusType));

            // Update the priority queue with the new bus and its endtime
            queue.Enqueue(nextBusNumber, schedule.EndTime);

            // Update the next bus number
            nextBusNumberByBusType[chosenBusType] = ++nextBusNumber;
        }
        return generatedSchedules;
    }

    List<Assignment> ISchedulerService.GetAssignments(DateOnly date)
    {
        throw new NotImplementedException();
    }
}
