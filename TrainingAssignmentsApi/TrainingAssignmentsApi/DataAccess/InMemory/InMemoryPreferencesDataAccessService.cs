using System;
using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.DataAccess.InMemory;

public class InMemoryPreferencesDataAccessService : IPreferencesDataAccessService
{
	private readonly Dictionary<DateOnly, List<Request>> store = [];

    public List<Request> GetRequests(DateOnly date)
    {
        if (!store.TryGetValue(date, out var requests)) {
			return [];
		} else {
			return requests;
		}
    }

    public void SaveRequests(List<Request> requests)
    {
    	if (requests.Count == 0) {
			throw new Exception("No assignments provided to save");
		}
        store[DateOnly.FromDateTime(requests.First().StartTime)] = requests;
    }
}
