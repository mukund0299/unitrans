using System;
using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.Mappers;

public static class GenerateResponseMapper
{
    public static GenerateResponse ToGenerateResponse(List<Assignment> assignments) {
        Dictionary<BusType, Dictionary<int, List<TrainingAssignmentResponse>>> groupedResponse = [];
        foreach (var assignment in assignments)
        {
            if (!groupedResponse.TryGetValue(assignment.BusType, out Dictionary<int, List<TrainingAssignmentResponse>>? groupByBusNumberForBusType))
            {
                groupByBusNumberForBusType = [];
                groupedResponse[assignment.BusType] = groupByBusNumberForBusType;
            }

            if (!groupByBusNumberForBusType.TryGetValue(assignment.BusNumber, out List<TrainingAssignmentResponse>? assignmentsToThisBus))
            {
                assignmentsToThisBus = [];
                groupByBusNumberForBusType[assignment.BusNumber] = assignmentsToThisBus;
            }

            assignmentsToThisBus.Add(new TrainingAssignmentResponse(assignment.Requestor, assignment.StartTime, assignment.EndTime));    
        }
        return new GenerateResponse(groupedResponse);
    }
}
