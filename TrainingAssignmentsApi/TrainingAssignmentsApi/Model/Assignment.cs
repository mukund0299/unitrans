using System;

namespace TrainingAssignmentsApi.Model;

public record Assignment(string Requestor, DateTime StartTime, DateTime EndTime, int BusNumber, BusType BusType);