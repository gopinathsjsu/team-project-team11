
# Online Banking

### Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
    - [Customer](#features)
    - [Admin](#features)
3. [Design Decision](#introduction) 
4. [Architecture](#architecture)
5. [UI Wireframes]()
6. [Installations]()


## Introduction

A Banking application that allows user to perform Banking related operations such as add new accounts, perform transactions and view transaction history.

### Design Decision



<strong>Team Members</strong>

[@singhal-akash67](https://github.com/singhal-akash67) - Akash Singhal(SJSU ID: 015257203) akash.singhal@sjsu.edu

[@narensulegai](https://github.com/narensulegai) - Naren Sulegai(SJSU ID: 014483443)

[@NehaPoonia](https://github.com/NehaPoonia)
[@Nehapoonia01](https://github.com/Nehapoonia01) - Neha Poonia(SJSU ID: 015252900) neha.poonia@sjsu.edu

[@sowmyadvn](https://github.com/sowmyadvn) - Sowmya Dharani(SJSU ID: 01145168)

## Features

### Admin

- Add a new account to the system(Checking,Savings).
- Remove existing accounts (only if there is no balance in the account)
- Add manual transactions.

### Customer

- Internal transaction, from one account to another.
- External transactions to non-member accounts of the bank.
- Setting up recurring transactions for internal or external payments
- Search and view transactions by date/account number etc.

## Architecture

### Deployment Diagram

![Deplyment diagram](https://user-images.githubusercontent.com/436710/118338119-345f8200-b4ca-11eb-82e0-72777e22d6b8.png)

### Architecture Diagram

![Architecture diagram](https://user-images.githubusercontent.com/436710/118338194-59ec8b80-b4ca-11eb-811d-c6960975fa88.png)

### Installations

Install k3d for local cluster 
https://en.sokube.ch/post/k3s-k3d-k8s-a-new-perfect-match-for-dev-and-test

### EKS
1. Create cluster with all defaults
2. Select node IAM Role eks
3. SSH key pair 86narensj
4. Node Group scaling configuration - Min/Max set 1

### Deploy using help
```
# create a cluster - ingress port 8004->80
k3d cluster create unitedbank --port 8004:80@loadbalancer
# show all context
kubectl config get-contexts
# show current context - this should be set to k3d-unitedbank automatically
kubectl config current-context
# create a new namespace
kubectl create namespace unitedbank
# set default namespace
kubectl config set-context --current --namespace=unitedbank
# test if frontend service is up
kubectl port-forward service/frontend 8006:80
# delete everything
kubectl delete all --all -n unitedbank && kubectl delete ingress unitedbank
```

### Deploy using helm
(Assuming that a cluster is created on AWS)
```
# check template
helm template -f production.yaml unitedbank ./helm
# deploy (install if not)
helm upgrade --install -f production.yaml unitedbank ./helm
# check status
kubectl get all
# App url -> A new load balancer will be created (use http not https)
# Delete nodegroup before deleing cluster
```

### EKS
```
# check context
kubectl config get-contexts
# set context
kubectl config current-context <context>
# print
aws eks update-kubeconfig --name unitedbank --dry-run
```

### TODO
Setting up ingress
https://faun.pub/learning-kubernetes-on-eks-by-doing-part-4-ingress-on-eks-6c5e5a34920b

### Dev set up 

1. Install node and npm
2. Install mongodb locally ex for mac use $  brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb/brew/mongodb-community

```
# to start React frontend

# start frontend
cd frontend && npm install && export REACT_APP_API_URL=http://localhost:5000 && npm start

# please configure your mongodb connection string in backend/.env

# to start node backend
cd backend && npm install && npm start
```
