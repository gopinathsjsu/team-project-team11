
# Online Banking System

A banking application which exposes API calls to add new accounts, perform transactions and view transaction history.

### Architecture Diagram

![111834560-00dcee80-88b1-11eb-85e4-5368e3be0f9d](https://user-images.githubusercontent.com/436710/115127619-abb5fa80-9f8c-11eb-9e41-cbab051c059c.png)
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
