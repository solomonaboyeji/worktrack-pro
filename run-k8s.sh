# minikube start --driver=hyperkit --memory=3000

eval $(minikube docker-env)

cd payment-managment-service && docker build -f docker/Dockerfile -t payments-mgt . && cd ..
cd timesheet-management-service && docker build -f docker/Dockerfile -t timesheets-mgt . && cd ..
cd tasks-management-service && docker build -f Dockerfile -t tasks-mgt . && cd ..
cd users-service && docker build -f Dockerfile -t users-mgt . && cd ..

# Apply ConfigMaps
# --- These contain configuration data for your services.
# --- For Payments
kubectl apply -f  k8s/local/payments/payments-configmap.yml

# --- For Timesheets
kubectl apply -f  k8s/local/timesheets/timesheets-configmap.yml

# --- For Tasks
kubectl apply -f  k8s/local/tasks/tasks-configmap.yml

# --- For Users
kubectl apply -f  k8s/local/users/users-configmap.yml




# Apply Persistent Volume Claims
# --- These define persistent storage for our databases
# For Payments Database
# Not persisting this intentionally
# kubectl apply -f  k8s/local/payments/database/payments-db-pvc.yml

# --- For Timesheets Database
# Not persisting this intentionally
# kubectl apply -f  k8s/local/timesheets/database/timesheets-db-pvc.yml

# --- For Tasks
kubectl apply -f  k8s/local/tasks/database/tasks-db-pvc.yml

# --- For Users
kubectl apply -f  k8s/local/users/database/users-db-pvc.yml



# Deploy Databases
# --- These deployments set up our PostgresSQL Instances
# --- For Payments Database
kubectl apply -f  k8s/local/payments/database/payments-db-deployment.yml

# --- For Timesheets Database
kubectl apply -f  k8s/local/timesheets/database/timesheet-db-deployment.yml

# --- For Tasks
kubectl apply -f  k8s/local/tasks/database/tasks-db-deployment.yml

# --- For Users
kubectl apply -f  k8s/local/users/database/users-db-deployment.yml



# Expose the Database Services
# --- These services make our databases accessible to other services within in the cluster
# --- For Payments Database
kubectl apply -f  k8s/local/payments/database/payments-db-service.yml

# --- For Timesheets Database
kubectl apply -f  k8s/local/timesheets/database/timesheet-db-service.yml

# --- For Tasks
kubectl apply -f  k8s/local/tasks/database/tasks-db-service.yml

# --- For Users
kubectl apply -f  k8s/local/users/database/users-db-service.yml




# Deploy the Applications
# --- These deployments set up our application instances
# --- For Payments Application
kubectl apply -f  k8s/local/payments/payment-deployment.yml

# --- For Timesheets Application
kubectl apply -f  k8s/local/timesheets/timsheets-deployment.yml

# --- For Tasks Application
kubectl apply -f  k8s/local/tasks/tasks-deployment.yml

# --- For Users
kubectl apply -f  k8s/local/users/users-deployment.yml




# Expose the Application Services
# --- These services make our applications accessible within the cluster.
# --- For Payments Application
kubectl apply -f  k8s/local/payments/payment-service.yml

# --- For Timesheets Application
kubectl apply -f  k8s/local/timesheets/timesheets-service.yml

# --- For Timesheets Application
kubectl apply -f  k8s/local/tasks/tasks-service.yml

# --- For Users
kubectl apply -f  k8s/local/users/users-service.yml

# Run Alembic Upgrade Timesheet and Payment PODs using their match labels
for app in payments-service-api timesheets-service-api; do
    pods=$(kubectl get pods -l app=$app -o name)
    for pod in $pods; do
        echo "Executing command in $pod"
        kubectl exec $pod -- alembic upgrade heads
    done
done
