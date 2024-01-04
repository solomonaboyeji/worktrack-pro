# Apply ConfigMaps
# --- These contain configuration data for your services.
# --- For Payments
kubectl apply -f  k8s/local/payments/payments-configmap.yml

# --- For Timesheets
kubectl apply -f  k8s/local/timesheets/timesheets-configmap.yml




# Apply Persistent Volume Claims
# --- These define persistent storage for our databases
# For Payments Database
kubectl apply -f  k8s/local/payments/database/payments-db-pvc.yml

# --- For Timesheets Database
kubectl apply -f  k8s/local/timesheets/database/timesheets-db-pvc.yml




# Deploy Databases
# --- These deployments set up our PostgresSQL Instances
# --- For Payments Database
kubectl apply -f  k8s/local/payments/database/payments-db-deployment.yml

# --- For Timesheets Database
kubectl apply -f  k8s/local/timesheets/database/timesheet-db-deployment.yml



# Expose the Database Services
# --- These services make our databases accessible to other services within in the cluster
# --- For Payments Database
kubectl apply -f  k8s/local/payments/database/payments-db-service.yml

# --- For Timesheets Database
kubectl apply -f  k8s/local/timesheets/database/timesheet-db-service.yml




# Deploy the Applications
# --- These deployments set up our application instances
# --- For Payments Application
kubectl apply -f  k8s/local/payments/payment-deployment.yml

# --- For Timesheets Application
kubectl apply -f  k8s/local/timesheets/timsheets-deployment.yml




# Expose the Application Services
# --- These services make our applications accessible within the cluster.
# --- For Payments Application
kubectl apply -f  k8s/local/payments/payment-service.yml

# --- For Timesheets Application
kubectl apply -f  k8s/local/timesheets/timesheets-service.yml