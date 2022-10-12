# Booking app
## 1. How to run on Linux/Ubuntu
### Firstly you should install ruby 3.1.2, nodejs, npm, yarn.
### 1.1 Install dependencies
```bash
bundle install
```
```bash
npm install yarn --global
```
```bash
npm install
```
### 1.2 After that, you should create and fill .env file accordingly .env.template

### 1.3 Set up database
```bash
rails db:setup
```

### 1.4 Start development server
```bash
rails s
```
Or

```bash
rails s -b YOUR_HOST -p YOUR_PORT
```

### 1.5 Set up admin user

```bash
rails c
```
```bash
u = User.find_by(email: 'YOUR_EMAIL')
```
```bash
u.role = 'admin'
```
### 1.6 Create employee 
Only employees have access to Booking page.
You need to create company.
After that. In admin panel you have to create employee, instead you can create employee in rails console

# Good Luck!
