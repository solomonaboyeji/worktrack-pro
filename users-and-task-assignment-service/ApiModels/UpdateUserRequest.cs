using JobTrackPro.Models;
using System.Text.Json.Serialization;

namespace JobTrackPro.ApiModels
{
    public class UpdateUserRequest
    {
        public required string firstName { get; set; }

        public required string lastName { get; set; }

        public required string phoneNumber { get; set; }

        public required bool isLegalStatus { get; set; }

        public required string postCode { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required UserRole role { get; set; }
    }
}
