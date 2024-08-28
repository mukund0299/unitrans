using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.DataAccess;

public interface IAssignmentsDataAccessService
{
	public List<Assignment> GetAssignments(DateOnly date);

	public void SaveAssignments(List<Assignment> assignments);

	public void DeleteAssignments(DateOnly date);
}
