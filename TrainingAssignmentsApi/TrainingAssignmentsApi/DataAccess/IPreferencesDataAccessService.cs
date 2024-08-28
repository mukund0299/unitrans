using System;
using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.DataAccess;

public interface IPreferencesDataAccessService
{
	public List<Request> GetRequests(DateOnly date);

	public void SaveRequests(List<Request> requests);
}
