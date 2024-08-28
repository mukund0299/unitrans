using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.DataAccess.InMemory;

public class InMemoryAssignmentsDataAccessService : IAssignmentsDataAccessService
{
	private readonly Dictionary<DateOnly, List<Assignment>> store = [];
    public void DeleteAssignments(DateOnly date)
    {
        store.Remove(date);
    }

    public List<Assignment> GetAssignments(DateOnly date)
    {
        if (!store.TryGetValue(date, out var assignments)) {
			return [];
		} else {
			return assignments;
		}
    }

    public void SaveAssignments(List<Assignment> assignments)
    {
		if (assignments.Count == 0) {
			throw new Exception("No assignments provided to save");
		}
        store[DateOnly.FromDateTime(assignments.First().StartTime)] = assignments;
    }
}
