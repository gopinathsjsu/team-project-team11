
# Online Banking

### Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
    - [Customer](#features)
    - [Admin](#features)
3. [Design Decision](#introduction) 
4. [Architecture](#architecture)
5. [UI Wireframes](#Installations)
6. [Installations](#Installations)


## Introduction

A Banking application that allows user to perform Banking related operations such as add new accounts, perform transactions and view transaction history.

### Design Decision
We have chosen following tech stack -

1. NodeJS - We decided to go ahead with NodeJS because of better efficiency and its single threaded feature. It also provides huge community suppport which makes development work easy. Also it provided many open source libraries. Number of concurrent users we could support using NodeJS was the primary reason of why we used NodeJS at backend. Secondary reason - Most of our resources are good on this therefore learning curve was less which decreased the turn around time.

2. ReactJS - We decided to go ahead with ReactJS because of its highly effecient rendering algorithm. Since it is single page application, we got better performance in terms of low memory and low rendering time. Secondly it is more SEO friendly which will help our maketing team. Again for ReactJS, we have very good community support which will boost our development speed. 

3. Kubernetes - Due to its portability, Kubernetes can host workloads running on a single cloud as well as workloads that are spread across multiple clouds. In addition, Kubernetes can easily scale its environment from one cloud to another.

4. AWS -  Scalable and high-performance. Using AWS tools, Auto Scaling, and Elastic Load Balancing, your application can scale up or down based on demand. Backed by Amazon's massive infrastructure, you have access to compute and storage resources when you need them. 


<strong>Team Members</strong>

[@singhal-akash67](https://github.com/singhal-akash67) - Akash Singhal(SJSU ID: 015257203) akash.singhal@sjsu.edu

[@narensulegai](https://github.com/narensulegai) - Naren Sulegai(SJSU ID: 014483443)

[@NehaPoonia](https://github.com/NehaPoonia)
[@Nehapoonia01](https://github.com/Nehapoonia01) - Neha Poonia(SJSU ID: 015252900) neha.poonia@sjsu.edu

[@sowmyadvn](https://github.com/sowmyadvn) - Sowmya Dharani(SJSU ID: 01145168) sowmya.dharanipragada@sjsu.edu

## Features

### Admin

- Approve a new account.
- Delete an existing accounts
- Manual account balance adjustments.

### Customer

- Request to open a new account - Savings/Checking
- Transfer between own accounts.
- Transfer to external accounts.
- Setting up recurring transactions to internal or external accounts
- Search and view transactions with date/account number etc.

## Architecture

### Deployment Diagram

![Deplyment diagram](https://user-images.githubusercontent.com/436710/118338119-345f8200-b4ca-11eb-82e0-72777e22d6b8.png)

### Architecture Diagram

![Architecture diagram](https://user-images.githubusercontent.com/436710/118338194-59ec8b80-b4ca-11eb-811d-c6960975fa88.png)

### UI Wireframes


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
