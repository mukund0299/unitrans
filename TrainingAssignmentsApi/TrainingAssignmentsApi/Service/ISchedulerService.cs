using System;
using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.Service;

// TODO: Should we be using DTO types directly like this? Look into this
public interface ISchedulerService
{
    public List<Assignment> GenerateAssignments(IList<TrainingRequest> requests, IDictionary<BusType, int> capacities);

    public List<Assignment> GetAssignments(DateOnly date);

    public bool DeleteAssignments(DateOnly date);
}
