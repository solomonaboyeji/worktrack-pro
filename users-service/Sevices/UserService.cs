using System.Data;
using System.Globalization;
using JobTrackPro.ApiModels;
using JobTrackPro.Helpers;
using JobTrackPro.Models;

namespace JobTrackPro.Sevices
{
    public class UserService
    {

        private Model_DataContext _context;
      
        public UserService (Model_DataContext context) {
            _context = context;
        }

        public List<UserModel> GetUsers()
        {
            List<UserModel> response = new List<UserModel>();
            var datalist = _context.Users.ToList();
            datalist.ForEach(row => response.Add(new UserModel()
            {
                firstName = row.first_name,
                email = row.email,
                id = row.id,
                lastName = row.last_name,
                postCode = row.post_code,
                starTime = row.start_time,
                createdAt = row.created_at,
                updatedAt = row.updated_at,
                isLegalStatus = row.is_legal_status,
                phoneNumber = row.phone_number,
                dob = row.dob,
                role = row.role,
                isEnabled = row.is_enabled,
                isVerified = row.is_verified
            }));

            return response;
        }
        public UserModel? GetUserByEmail(string email)
        {
            var row = _context.Users.FirstOrDefault(d => d.email.Equals(email));

            if (row != null)
            {
                return new UserModel()
                {
                    firstName = row.first_name,
                    email = row.email,
                    id = row.id,
                    lastName = row.last_name,
                    postCode = row.post_code,
                    starTime = row.start_time,
                    createdAt = row.created_at,
                    updatedAt = row.updated_at,
                    isLegalStatus = row.is_legal_status,
                    phoneNumber = row.phone_number,
                    dob = row.dob,
                    role = row.role,
                    isEnabled = row.is_enabled,
                    isVerified = row.is_verified
                };
            }
            else
            {
               
                return null; // or throw new Exception("User not found!");
            }
        }
        public UserModel? GetUserById(string id)
        {
            var row = _context.Users.Where(d => d.id.Equals(id)).FirstOrDefault();
            if (row != null)
            {
                return new UserModel()
                {
                    firstName = row.first_name,
                    email = row.email,
                    id = row.id,
                    lastName = row.last_name,
                    postCode = row.post_code,
                    starTime = row.start_time,
                    createdAt = row.created_at,
                    updatedAt = row.updated_at,
                    isLegalStatus = row.is_legal_status,
                    phoneNumber = row.phone_number,
                    dob = row.dob,
                    role = row.role,
                    isEnabled = row.is_enabled,
                    isVerified = row.is_verified
                };
            }
            else
            {
               return null; // or throw new Exception("User not found!");
            }

        }
        public UserModel CreateUser(UserRequestModel userBody)
        {
            RandomStringGenerator generator = new RandomStringGenerator();
            string randomId = generator.GenerateRandomString(8);

            DateTime currentDateTime = DateTime.Now;
            Console.WriteLine(currentDateTime);
            
            User dbTable = new User
            {
                email = userBody.email,
                id= randomId,
                first_name = userBody.firstName,
                last_name = userBody.lastName,
                phone_number = userBody.phoneNumber,
                dob = userBody.dob,
                start_time = userBody.starTime,
                post_code = userBody.postCode,
                role = userBody.role,
                is_legal_status = userBody.isLegalStatus,
                password = userBody.password,
                is_enabled = true,
                is_verified = false,
                created_at = currentDateTime,
                updated_at = currentDateTime
            };
            _context.Users.Add(dbTable);
            _context.SaveChanges();
            return new UserModel()
            {
                email = userBody.email,
                id = randomId,
                firstName = userBody.firstName,
                lastName = userBody.lastName,
                phoneNumber = userBody.phoneNumber,
                dob = userBody.dob,
                starTime = userBody.starTime,
                postCode = userBody.postCode,
                role = userBody.role,
                isLegalStatus = userBody.isLegalStatus,
                isEnabled = true,
                isVerified = false,
                createdAt = currentDateTime,
                updatedAt = currentDateTime,
            };
        }
        public UserModel UpdateUser(UpdateUserRequest userBody, string id )
        {
           var  dbTable = _context.Users.Where(d => d.id.Equals(id)).FirstOrDefault();
 
            if (dbTable != null)
            {

                dbTable.first_name = userBody.firstName;
                dbTable.last_name = userBody.lastName;
                dbTable.phone_number = userBody.phoneNumber;
                dbTable.post_code = userBody.postCode;
                dbTable.is_legal_status = userBody.isLegalStatus;
                dbTable.role = userBody.role;
 
            }
            _context.SaveChanges();
            var row = _context.Users.Where(d => d.id.Equals(id)).FirstOrDefault();
            return new UserModel()
            {
                firstName = row.first_name,
                email = row.email,
                id = row.id,
                lastName = row.last_name,
                postCode = row.post_code,
                starTime = row.start_time,
                createdAt = row.created_at,
                updatedAt = row.updated_at,
                isLegalStatus = row.is_legal_status,
                phoneNumber = row.phone_number,
                dob = row.dob,
                role = row.role,
                isEnabled = row.is_enabled,
                isVerified = row.is_verified
            };
        }

        public void UpdatePassword(ChangePasswordRequestModel userBody, string id)
        {
            var dbTable = _context.Users.Where(d => d.id.Equals(id)).FirstOrDefault();

            if (dbTable != null)
            {

                dbTable.password = userBody.newPassword;

            }
            _context.SaveChanges();
            
          
        }
        public User? GetUserByEmailFull(string email)
        {
            var row = _context.Users.FirstOrDefault(d => d.email.Equals(email));

            if (row != null)
            {
                return new User()
                {
                    first_name = row.first_name,
                    email = row.email,
                    id = row.id,
                    last_name = row.last_name,
                    post_code = row.post_code,
                    start_time = row.start_time,
                    created_at = row.created_at,
                    updated_at = row.updated_at,
                    is_legal_status = row.is_legal_status,
                    phone_number = row.phone_number,
                    dob = row.dob,
                    role = row.role,
                    is_enabled = row.is_enabled,
                    is_verified = row.is_verified,
                    password = row.password
                };
            }
            else
            {

                return null; // or throw new Exception("User not found!");
            }
        }

        public User? GetUserByIdFull(string id)
        {
            var row = _context.Users.FirstOrDefault(d => d.id.Equals(id));

            if (row != null)
            {
                return new User()
                {
                    first_name = row.first_name,
                    email = row.email,
                    id = row.id,
                    last_name = row.last_name,
                    post_code = row.post_code,
                    start_time = row.start_time,
                    created_at = row.created_at,
                    updated_at = row.updated_at,
                    is_legal_status = row.is_legal_status,
                    phone_number = row.phone_number,
                    dob = row.dob,
                    role = row.role,
                    is_enabled = row.is_enabled,
                    is_verified = row.is_verified,
                    password = row.password
                };
            }
            else
            {

                return null;
            }
        }

        
    }
}
