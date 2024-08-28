using System;
using TrainingAssignmentsApi.Contracts;
using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.Service;

// TODO: Should we be using DTO types directly like this? Look into this
public interface ISchedulerService
{
    public List<Assignment> GenerateAssignments(DateOnly date, IDictionary<BusType, int> capacities);

    public List<Assignment> GetAssignments(DateOnly date);

    public void DeleteAssignments(DateOnly date);
}
