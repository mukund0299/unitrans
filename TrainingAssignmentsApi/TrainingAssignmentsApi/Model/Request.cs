namespace TrainingAssignmentsApi.Model;

public record Request(string Requestor, DateTime StartTime, DateTime EndTime, IList<BusType> BusTypes);
