# CLIENT

You will need to install python. Python 3.9

## Get Minikube IP

```sh
minikube ip
```

Update IP addresses in the seeder.py lines 5 - 6

## Create an env

```sh
python -m venv env
```

## Install Packages

```sh
    pip install requests
```

## Run Seeder

```sh
cd CLIENT && python seeder.py
```
