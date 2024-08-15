using System;

namespace TrainingAssignmentsApi.Model;

// Requests
public record TrainingRequest(string Requestor, DateTime StartTime, DateTime EndTime, IList<BusType> BusTypes);

public record GenerateRequest(IList<TrainingRequest> Requests, IDictionary<BusType, int> Capacities);

// Responses
public record GenerateResponse(Dictionary<BusType, Dictionary<int, List<TrainingAssignmentResponse>>> groupedAssignments);

public record TrainingAssignmentResponse(string Requestor, DateTime StartTime, DateTime EndTime);