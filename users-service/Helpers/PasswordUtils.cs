using System.Security.Cryptography;
using System.Text;

namespace JobTrackPro.Helpers
{
    public class PasswordUtils
    {
        public string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                var builder = new StringBuilder();
                for (int i = 0; i < hashedBytes.Length; i++)
                {
                    builder.Append(hashedBytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            // Hash the entered password using the same method used to hash the stored password
            string hashedEnteredPassword = HashPassword(enteredPassword);

            // Compare the hashed entered password with the stored hashed password
            return string.Equals(hashedEnteredPassword, storedHashedPassword, StringComparison.OrdinalIgnoreCase);
        }
    }
}
