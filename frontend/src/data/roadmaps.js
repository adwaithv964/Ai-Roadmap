export const roadmaps = {
    frontend: {
        title: 'Frontend Development Roadmap',
        stages: [
            {
                title: 'HTML',
                modules: [
                    {
                        id: 'html-basics',
                        title: 'Basic HTML',
                        steps: [
                            { id: 'html-1', title: 'HTML Syntax', description: 'Understand tags, elements, and attributes.', example: '<p class="text">Hello</p>' },
                            { id: 'html-2', title: 'Document Structure', description: 'Learn about <html>, <head>, and <body>.', example: '<!DOCTYPE html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>' },
                            { id: 'html-3', title: 'Text Formatting', description: 'Headings, paragraphs, bold, italic, lists.', example: '<h1>Title</h1>\n<ul><li>Item</li></ul>' },
                            { id: 'html-4', title: 'Links and Images', description: 'Creating hyperlinks and embedding images.', example: '<a href="url">Link</a>\n<img src="img.jpg" />' }
                        ]
                    },
                    {
                        id: 'html-intermediate',
                        title: 'Intermediate HTML',
                        steps: [
                            { id: 'html-5', title: 'Forms', description: 'Input types, labels, validation.', example: '<form>\n  <input type="text" required />\n</form>' },
                            { id: 'html-6', title: 'Tables', description: 'Rows, columns, headers.', example: '<table><tr><td>Data</td></tr></table>' },
                            { id: 'html-7', title: 'Semantic HTML', description: '<header>, <nav>, <main>, <footer>, <article>.', example: '<header>Logo</header>\n<main>Content</main>' }
                        ]
                    },
                    {
                        id: 'html-advanced',
                        title: 'Advanced HTML',
                        steps: [
                            { id: 'html-8', title: 'SEO Basics', description: 'Meta tags, title, alt text.', example: '<meta name="description" content="..." />' },
                            { id: 'html-9', title: 'Accessibility (a11y)', description: 'ARIA roles, semantic structure for screen readers.', example: '<button aria-label="Close">X</button>' },
                            { id: 'html-10', title: 'Canvas & SVG', description: 'Drawing graphics and vector images.', example: '<svg>...</svg>' }
                        ]
                    },
                ],
                project: 'Build a simple tribute page using semantic HTML.'
            },
            {
                title: 'CSS',
                modules: [
                    {
                        id: 'css-basics',
                        title: 'Basic CSS',
                        steps: [
                            { id: 'css-1', title: 'Selectors', description: 'Class, ID, element selectors.', example: '.class { color: red; }' },
                            { id: 'css-2', title: 'Colors & Backgrounds', description: 'Hex, RGB, gradients.', example: 'background: linear-gradient(...);' },
                            { id: 'css-3', title: 'Box Model', description: 'Margin, border, padding, content.', example: 'div { margin: 10px; padding: 20px; }' },
                            { id: 'css-4', title: 'Typography', description: 'Fonts, sizes, weights, alignment.', example: 'font-family: sans-serif;' }
                        ]
                    },
                    {
                        id: 'css-layout',
                        title: 'CSS Layouts',
                        steps: [
                            { id: 'css-5', title: 'Flexbox', description: 'One-dimensional layouts.', example: 'display: flex; justify-content: center;' },
                            { id: 'css-6', title: 'Grid', description: 'Two-dimensional layouts.', example: 'display: grid; grid-template-columns: 1fr 1fr;' },
                            { id: 'css-7', title: 'Positioning', description: 'Static, relative, absolute, fixed, sticky.', example: 'position: absolute; top: 0;' },
                            { id: 'css-8', title: 'Responsive Design', description: 'Media queries and breakpoints.', example: '@media (max-width: 768px) { ... }' }
                        ]
                    },
                    {
                        id: 'css-advanced',
                        title: 'Advanced CSS',
                        steps: [
                            { id: 'css-9', title: 'Transitions & Animations', description: 'Keyframes, transform, transition.', example: 'transform: scale(1.1);' },
                            { id: 'css-10', title: 'Variables', description: 'CSS Custom Properties.', example: ':root { --main-color: blue; }' },
                            { id: 'css-11', title: 'Preprocessors (Sass)', description: 'Nesting, mixins, variables.', example: '$color: red; .box { color: $color; }' },
                            { id: 'css-12', title: 'Tailwind CSS', description: 'Utility-first CSS framework.', example: '<div class="flex justify-center p-4">...</div>' }
                        ]
                    },
                ],
                project: 'Create a responsive portfolio website with a dark mode toggle.'
            },
            {
                title: 'JavaScript',
                modules: [
                    {
                        id: 'js-basics',
                        title: 'Basic JavaScript',
                        steps: [
                            { id: 'js-1', title: 'Variables & Data Types', description: 'let, const, var, strings, numbers, booleans.', example: 'const name = "Alice";' },
                            { id: 'js-2', title: 'Operators', description: 'Arithmetic, comparison, logical.', example: 'if (a > b && c) { ... }' },
                            { id: 'js-3', title: 'Control Flow', description: 'If/else, switch, loops.', example: 'for (let i=0; i<10; i++) { ... }' },
                            { id: 'js-4', title: 'Functions', description: 'Declarations, expressions, arrow functions.', example: 'const add = (a, b) => a + b;' }
                        ]
                    },
                    {
                        id: 'js-dom',
                        title: 'DOM Manipulation',
                        steps: [
                            { id: 'js-5', title: 'Selecting Elements', description: 'querySelector, getElementById.', example: 'document.querySelector(".btn")' },
                            { id: 'js-6', title: 'Event Listeners', description: 'Click, submit, input events.', example: 'btn.addEventListener("click", () => ...)' },
                            { id: 'js-7', title: 'Modifying DOM', description: 'Changing text, HTML, styles, classes.', example: 'el.classList.add("active");' }
                        ]
                    },
                    {
                        id: 'js-advanced',
                        title: 'Advanced JavaScript',
                        steps: [
                            { id: 'js-8', title: 'ES6+ Features', description: 'Destructuring, spread, template literals.', example: 'const { name } = user;' },
                            { id: 'js-9', title: 'Async/Await & Promises', description: 'Handling asynchronous operations.', example: 'const data = await fetch(url);' },
                            { id: 'js-10', title: 'Fetch API', description: 'Making HTTP requests.', example: 'fetch("/api/data").then(...)' },
                            { id: 'js-11', title: 'Modules', description: 'Import/Export.', example: 'import { func } from "./utils.js";' },
                            { id: 'js-12', title: 'Local Storage', description: 'Persisting data in the browser.', example: 'localStorage.setItem("key", "value");' }
                        ]
                    },
                ],
                project: 'Build a dynamic To-Do List app with LocalStorage.'
            },
            {
                title: 'React',
                modules: [
                    {
                        id: 'react-basics',
                        title: 'React Basics',
                        steps: [
                            { id: 'react-1', title: 'Components (JSX)', description: 'Functional components and JSX syntax.', example: 'const App = () => <h1>Hello</h1>;' },
                            { id: 'react-2', title: 'Props', description: 'Passing data to components.', example: '<Card title="My Card" />' },
                            { id: 'react-3', title: 'State (useState)', description: 'Managing local component state.', example: 'const [count, setCount] = useState(0);' },
                            { id: 'react-4', title: 'Events', description: 'Handling events in React.', example: 'onClick={handleClick}' }
                        ]
                    },
                    {
                        id: 'react-intermediate',
                        title: 'Intermediate React',
                        steps: [
                            { id: 'react-5', title: 'Effects (useEffect)', description: 'Side effects, data fetching, subscriptions.', example: 'useEffect(() => { ... }, []);' },
                            { id: 'react-6', title: 'Lists & Keys', description: 'Rendering arrays of data.', example: 'items.map(item => <li key={item.id}>{item.name}</li>)' },
                            { id: 'react-7', title: 'Forms', description: 'Controlled components.', example: 'value={text} onChange={e => setText(e.target.value)}' }
                        ]
                    },
                    {
                        id: 'react-advanced',
                        title: 'Advanced React',
                        steps: [
                            { id: 'react-8', title: 'Context API', description: 'Global state management.', example: 'const ThemeContext = createContext();' },
                            { id: 'react-9', title: 'Custom Hooks', description: 'Reusing stateful logic.', example: 'const useFetch = (url) => { ... }' },
                            { id: 'react-10', title: 'React Router', description: 'Client-side routing.', example: '<Route path="/about" element={<About />} />' },
                            { id: 'react-11', title: 'State Management (Redux/Zustand)', description: 'Managing complex app state.', example: 'useStore(state => state.user)' }
                        ]
                    },
                ],
                project: 'Build a Weather App using an external API.'
            },
        ],
    },
    backend: {
        title: "Backend Development Roadmap",
        stages: [
            {
                title: "Basics of Backend",
                modules: [
                    {
                        id: "backend-basics-foundations",
                        title: "Foundational Concepts",
                        steps: [
                            { id: "basics-1", title: "Understand What Backend Development Is", description: "Learn the role of the backend in the client-server architecture. It handles business logic, database interactions, and API responses.", example: "The waiter (backend) takes the order from the customer (frontend) to the kitchen (database)." },
                            { id: "basics-2", title: "Client-Server Architecture", description: "Understand how clients (browsers, mobile apps) communicate with servers via HTTP/HTTPS.", example: "Request -> Server -> Response" },
                            { id: "basics-3", title: "HTTP Protocols & Methods", description: "Learn about GET, POST, PUT, DELETE, status codes (200, 404, 500), and headers.", example: "GET /users (Fetch users), POST /users (Create user)" },
                            { id: "basics-4", title: "DNS & How the Web Works", description: "Understand Domain Name Systems, IP addresses, and how a URL is resolved to a server.", example: "google.com -> 142.250.190.46" }
                        ]
                    },
                    {
                        id: "backend-basics-os",
                        title: "OS & Terminal",
                        steps: [
                            { id: "os-1", title: "Basic Terminal Commands", description: "Learn navigation (cd, ls, pwd), file manipulation (mkdir, touch, rm), and permissions (chmod).", example: "mkdir my-project && cd my-project" },
                            { id: "os-2", title: "Process Management", description: "Understand processes, threads, and how to manage them (ps, kill, top).", example: "kill -9 <PID>" },
                            { id: "os-3", title: "Environment Variables", description: "Learn how to store secrets and configuration outside of code.", example: "export DB_PASSWORD=secret" }
                        ]
                    },
                    {
                        id: "backend-basics-vcs",
                        title: "Version Control (Git)",
                        steps: [
                            { id: "git-1", title: "Git Basics", description: "Init, clone, add, commit, push, pull.", example: "git commit -m 'Initial commit'" },
                            { id: "git-2", title: "Branching & Merging", description: "Working with branches, resolving conflicts, and pull requests.", example: "git checkout -b feature-login" },
                            { id: "git-3", title: "GitHub/GitLab", description: "Hosting repositories and collaborating.", example: "Pushing code to a remote repo." }
                        ]
                    }
                ],
                project: "Set up a GitHub repository and practice basic Git commands. Create a README.md explaining what you learned."
            },
            {
                title: "Programming Language (Choose One)",
                modules: [
                    {
                        id: "backend-lang-node",
                        title: "Node.js (JavaScript)",
                        steps: [
                            { id: "node-1", title: "Node.js Runtime", description: "Understand the event loop, non-blocking I/O, and the V8 engine.", example: "Running JS outside the browser." },
                            { id: "node-2", title: "NPM/Yarn", description: "Package management, package.json, and dependencies.", example: "npm install express" },
                            { id: "node-3", title: "Modules (CommonJS vs ES Modules)", description: "Importing and exporting code.", example: "require('fs') vs import fs from 'fs'" },
                            { id: "node-4", title: "Async Programming", description: "Callbacks, Promises, and Async/Await.", example: "await fs.readFile('file.txt')" }
                        ]
                    },
                    {
                        id: "backend-lang-python",
                        title: "Python",
                        steps: [
                            { id: "py-1", title: "Python Syntax", description: "Variables, loops, functions, classes.", example: "def hello(): print('Hello')" },
                            { id: "py-2", title: "PIP & Virtual Environments", description: "Managing packages and isolating dependencies.", example: "pip install requests" },
                            { id: "py-3", title: "File Handling", description: "Reading and writing files.", example: "open('file.txt', 'r')" }
                        ]
                    }
                ],
                project: "Write a CLI tool (in Node.js or Python) that takes a user's name and saves it to a file."
            },
            {
                title: "Databases",
                modules: [
                    {
                        id: "backend-db-relational",
                        title: "Relational Databases (SQL)",
                        steps: [
                            { id: "sql-1", title: "SQL Basics", description: "SELECT, INSERT, UPDATE, DELETE.", example: "SELECT * FROM users;" },
                            { id: "sql-2", title: "Table Design", description: "Primary keys, foreign keys, data types.", example: "CREATE TABLE users (id INT PRIMARY KEY...)" },
                            { id: "sql-3", title: "Joins & Relationships", description: "One-to-one, one-to-many, many-to-many.", example: "JOIN orders ON users.id = orders.user_id" },
                            { id: "sql-4", title: "Normalization", description: "Organizing data to reduce redundancy.", example: "1NF, 2NF, 3NF" },
                            { id: "sql-5", title: "PostgreSQL/MySQL", description: "Setting up and connecting to a database server.", example: "psql -U postgres" }
                        ]
                    },
                    {
                        id: "backend-db-nosql",
                        title: "NoSQL Databases",
                        steps: [
                            { id: "nosql-1", title: "Document Stores (MongoDB)", description: "Collections, documents, JSON-like structure.", example: "db.users.find({})" },
                            { id: "nosql-2", title: "Key-Value Stores (Redis)", description: "Caching and fast lookups.", example: "SET user:1 'Alice'" }
                        ]
                    },
                    {
                        id: "backend-db-orm",
                        title: "ORMs & ODMs",
                        steps: [
                            { id: "orm-1", title: "Using an ORM", description: "Prisma, Sequelize, TypeORM (Node) or SQLAlchemy (Python).", example: "await prisma.user.create(...)" },
                            { id: "orm-2", title: "Migrations", description: "Managing database schema changes over time.", example: "prisma migrate dev" }
                        ]
                    }
                ],
                project: "Design a database schema for a simple blog (Users, Posts, Comments) and write SQL queries to fetch data."
            },
            {
                title: "Building APIs",
                modules: [
                    {
                        id: "backend-api-rest",
                        title: "RESTful APIs",
                        steps: [
                            { id: "rest-1", title: "REST Principles", description: "Statelessness, resources, standard methods.", example: "GET /articles/1" },
                            { id: "rest-2", title: "Express.js (Node) / Flask (Python)", description: "Setting up a server and defining routes.", example: "app.get('/', (req, res) => ...)" },
                            { id: "rest-3", title: "Request & Response Objects", description: "Handling headers, body, query params.", example: "req.body, res.json({...})" },
                            { id: "rest-4", title: "Middleware", description: "Logging, error handling, authentication checks.", example: "app.use(cors())" }
                        ]
                    },
                    {
                        id: "backend-api-auth",
                        title: "Authentication & Security",
                        steps: [
                            { id: "auth-1", title: "Hashing Passwords", description: "Never store plain text passwords. Use bcrypt or Argon2.", example: "bcrypt.hash(password, 10)" },
                            { id: "auth-2", title: "JWT (JSON Web Tokens)", description: "Stateless authentication mechanism.", example: "jwt.sign({ id: user.id }, secret)" },
                            { id: "auth-3", title: "OAuth 2.0", description: "Login with Google/GitHub.", example: "Passport.js strategies." },
                            { id: "auth-4", title: "CORS & Helmet", description: "Securing headers and handling cross-origin requests.", example: "app.use(helmet())" }
                        ]
                    }
                ],
                project: "Build a REST API for a Todo App with User Authentication (Register, Login, CRUD Todos)."
            },
            {
                title: "Deployment & DevOps Basics",
                modules: [
                    {
                        id: "backend-deploy",
                        title: "Deployment",
                        steps: [
                            { id: "deploy-1", title: "PaaS Providers", description: "Deploying to Heroku, Vercel, or Render.", example: "git push heroku main" },
                            { id: "deploy-2", title: "Docker Basics", description: "Containerizing applications.", example: "docker build -t my-app ." },
                            { id: "deploy-3", title: "CI/CD Basics", description: "Automating tests and deployment (GitHub Actions).", example: ".github/workflows/deploy.yml" }
                        ]
                    }
                ],
                project: "Dockerize your API and deploy it to a free hosting service (like Render)."
            }
        ]
    },
    fullstack: {
        title: "Full-Stack Development Roadmap",
        stages: [
            {
                title: "Frontend Foundations",
                modules: [
                    { id: "fs-fe-1", title: "HTML/CSS/JS", steps: [{ id: "fs-1", title: "Master the Basics", description: "Review HTML5, CSS3, and ES6+ JavaScript.", example: "Semantic HTML, Flexbox/Grid, Async/Await" }] },
                    { id: "fs-fe-2", title: "Frontend Framework", steps: [{ id: "fs-2", title: "React/Vue/Angular", description: "Choose one and master components, state, and props.", example: "React Hooks, Context API" }] }
                ],
                project: "Build a responsive landing page with interactive elements."
            },
            {
                title: "Backend Foundations",
                modules: [
                    { id: "fs-be-1", title: "Server-Side Language", steps: [{ id: "fs-3", title: "Node.js/Python/Go", description: "Learn to build a server.", example: "Express.js server setup" }] },
                    { id: "fs-be-2", title: "Databases", steps: [{ id: "fs-4", title: "SQL vs NoSQL", description: "Learn PostgreSQL or MongoDB.", example: "CRUD operations" }] }
                ],
                project: "Create a simple API that serves data to your frontend."
            },
            {
                title: "Integration & Advanced",
                modules: [
                    { id: "fs-int-1", title: "Connecting FE & BE", steps: [{ id: "fs-5", title: "API Consumption", description: "Fetch data from your backend in your frontend app.", example: "useEffect(() => fetch('/api')...)" }] },
                    { id: "fs-int-2", title: "Authentication", steps: [{ id: "fs-6", title: "Full Stack Auth", description: "Implement login/signup flow.", example: "JWT storage in HTTPOnly cookies" }] },
                    { id: "fs-int-3", title: "Deployment", steps: [{ id: "fs-7", title: "Hosting", description: "Deploy frontend (Vercel/Netlify) and backend (Render/Railway).", example: "CI/CD pipelines" }] }
                ],
                project: "Build a full-stack E-commerce store or Social Media dashboard."
            }
        ]
    },
    ios: {
        title: "iOS Development Roadmap",
        stages: [
            {
                title: "Swift Basics",
                modules: [
                    { id: "ios-swift-1", title: "Language Fundamentals", steps: [{ id: "ios-1", title: "Variables & Constants", description: "var vs let, type inference.", example: "let name = \"Steve\"" }, { id: "ios-2", title: "Control Flow", description: "if, guard, switch, loops.", example: "guard let value = optional else { return }" }] },
                    { id: "ios-swift-2", title: "OOP in Swift", steps: [{ id: "ios-3", title: "Classes & Structs", description: "Value vs Reference types.", example: "struct User { ... }" }, { id: "ios-4", title: "Protocols & Extensions", description: "Protocol-oriented programming.", example: "extension String { ... }" }] }
                ],
                project: "Build a CLI tool in Swift to calculate BMI."
            },
            {
                title: "SwiftUI & UIKit",
                modules: [
                    { id: "ios-ui-1", title: "SwiftUI Basics", steps: [{ id: "ios-5", title: "Views & Modifiers", description: "Text, Image, VStack, HStack.", example: "VStack { Text(\"Hello\") }" }, { id: "ios-6", title: "State Management", description: "@State, @Binding, @ObservedObject.", example: "@State var isOn = false" }] },
                    { id: "ios-ui-2", title: "Navigation", steps: [{ id: "ios-7", title: "NavigationStack", description: "Moving between screens.", example: "NavigationLink(\"Go\", destination: DetailView())" }] }
                ],
                project: "Create a simple To-Do list app using SwiftUI."
            },
            {
                title: "Data & Networking",
                modules: [
                    { id: "ios-data-1", title: "Networking", steps: [{ id: "ios-8", title: "URLSession", description: "Fetching data from APIs.", example: "URLSession.shared.dataTask..." }, { id: "ios-9", title: "Codable", description: "Parsing JSON.", example: "struct User: Codable { ... }" }] },
                    { id: "ios-data-2", title: "Persistence", steps: [{ id: "ios-10", title: "CoreData / SwiftData", description: "Saving data locally.", example: "@Model class Item { ... }" }, { id: "ios-11", title: "UserDefaults", description: "Storing simple settings.", example: "UserDefaults.standard.set(true, forKey: \"isLoggedIn\")" }] }
                ],
                project: "Build a Weather App fetching data from a real API."
            }
        ]
    },
    android: {
        title: "Android Development Roadmap",
        stages: [
            {
                title: "Kotlin Basics",
                modules: [
                    { id: "and-kot-1", title: "Language Fundamentals", steps: [{ id: "and-1", title: "Variables & Functions", description: "val vs var, fun.", example: "fun main() { println(\"Hello\") }" }, { id: "and-2", title: "Null Safety", description: "Nullable types (String?), safe calls (?.).", example: "val len = text?.length" }] },
                    { id: "and-kot-2", title: "OOP", steps: [{ id: "and-3", title: "Classes & Data Classes", description: "Constructors, properties.", example: "data class User(val name: String)" }] }
                ],
                project: "Build a simple calculator logic in Kotlin."
            },
            {
                title: "Android UI (Jetpack Compose)",
                modules: [
                    { id: "and-ui-1", title: "Compose Basics", steps: [{ id: "and-4", title: "Composables", description: "Building UI with functions.", example: "@Composable fun Greeting() { Text(\"Hi\") }" }, { id: "and-5", title: "Layouts", description: "Column, Row, Box.", example: "Column { Text(\"A\"); Text(\"B\") }" }] },
                    { id: "and-ui-2", title: "State Management", steps: [{ id: "and-6", title: "State Hoisting", description: "remember, mutableStateOf.", example: "var count by remember { mutableStateOf(0) }" }] }
                ],
                project: "Create a counter app with Jetpack Compose."
            },
            {
                title: "Architecture & Data",
                modules: [
                    { id: "and-arch-1", title: "Architecture Components", steps: [{ id: "and-7", title: "ViewModel", description: "Managing UI-related data.", example: "class MyViewModel : ViewModel() { ... }" }, { id: "and-8", title: "LiveData / Flow", description: "Reactive data streams.", example: "val data: StateFlow<String>" }] },
                    { id: "and-arch-2", title: "Networking & Storage", steps: [{ id: "and-9", title: "Retrofit", description: "HTTP client for Android.", example: "@GET(\"users\") suspend fun getUsers()" }, { id: "and-10", title: "Room Database", description: "Local SQLite abstraction.", example: "@Dao interface UserDao { ... }" }] }
                ],
                project: "Build a Note-taking app with Room database."
            }
        ]
    },
    datascience: {
        title: "Data Science Roadmap",
        stages: [
            {
                title: "Python & Math",
                modules: [
                    { id: "ds-1", title: "Python for Data Science", steps: [{ id: "ds-py-1", title: "NumPy & Pandas", description: "Data manipulation and analysis.", example: "pd.read_csv('data.csv')" }] },
                    { id: "ds-2", title: "Statistics & Probability", steps: [{ id: "ds-math-1", title: "Descriptive Stats", description: "Mean, median, mode, variance.", example: "df.describe()" }, { id: "ds-math-2", title: "Probability Distributions", description: "Normal, Binomial, Poisson.", example: "Bell curve understanding." }] }
                ],
                project: "Analyze a dataset (e.g., Titanic) and perform EDA (Exploratory Data Analysis)."
            },
            {
                title: "Machine Learning Basics",
                modules: [
                    { id: "ds-ml-1", title: "Supervised Learning", steps: [{ id: "ds-ml-2", title: "Regression & Classification", description: "Linear Regression, Logistic Regression, Decision Trees.", example: "sklearn.linear_model.LinearRegression" }] },
                    { id: "ds-ml-3", title: "Unsupervised Learning", steps: [{ id: "ds-ml-4", title: "Clustering", description: "K-Means, Hierarchical Clustering.", example: "KMeans(n_clusters=3)" }] }
                ],
                project: "Build a house price prediction model."
            },
            {
                title: "Deep Learning & AI",
                modules: [
                    { id: "ds-dl-1", title: "Neural Networks", steps: [{ id: "ds-dl-2", title: "TensorFlow / PyTorch", description: "Building deep learning models.", example: "torch.nn.Linear(10, 1)" }] },
                    { id: "ds-dl-3", title: "NLP or CV", steps: [{ id: "ds-dl-4", title: "Specialization", description: "Natural Language Processing or Computer Vision.", example: "Transformers, CNNs" }] }
                ],
                project: "Create an image classifier or a sentiment analysis tool."
            }
        ]
    },
    cybersecurity: {
        title: "Cybersecurity Roadmap",
        stages: [
            {
                title: "Foundations",
                modules: [
                    { id: "cs-1", title: "Networking Basics", steps: [{ id: "cs-net-1", title: "OSI Model & TCP/IP", description: "How data moves across networks.", example: "Layers 1-7" }, { id: "cs-net-2", title: "IPs, Ports, Protocols", description: "DNS, HTTP, SSH, FTP.", example: "Port 80 vs 443" }] },
                    { id: "cs-2", title: "OS & Linux", steps: [{ id: "cs-os-1", title: "Linux Command Line", description: "Essential for security tools.", example: "Kali Linux basics" }] }
                ],
                project: "Set up a virtual lab with Kali Linux and a vulnerable target (Metasploitable)."
            },
            {
                title: "Security Concepts",
                modules: [
                    { id: "cs-3", title: "Information Security", steps: [{ id: "cs-sec-1", title: "CIA Triad", description: "Confidentiality, Integrity, Availability.", example: "Core principles" }, { id: "cs-sec-2", title: "Cryptography", description: "Encryption, Hashing, PKI.", example: "AES, RSA, SHA-256" }] }
                ],
                project: "Encrypt and decrypt files using GPG."
            },
            {
                title: "Offensive & Defensive",
                modules: [
                    { id: "cs-4", title: "Ethical Hacking", steps: [{ id: "cs-hack-1", title: "Reconnaissance", description: "Gathering info (Nmap, Shodan).", example: "nmap -sV target_ip" }, { id: "cs-hack-2", title: "Web App Security", description: "OWASP Top 10.", example: "SQL Injection, XSS" }] },
                    { id: "cs-5", title: "Blue Teaming", steps: [{ id: "cs-def-1", title: "Monitoring & Logging", description: "SIEM, IDS/IPS.", example: "Splunk, Snort" }] }
                ],
                project: "Perform a vulnerability scan on a test server and write a report."
            }
        ]
    },
    devops: {
        title: "DevOps Roadmap",
        stages: [
            {
                title: "Culture & Basics",
                modules: [
                    { id: "do-1", title: "DevOps Concepts", steps: [{ id: "do-con-1", title: "What is DevOps?", description: "Collaboration, Automation, CI/CD.", example: "Breaking silos" }] },
                    { id: "do-2", title: "OS & Scripting", steps: [{ id: "do-os-1", title: "Linux & Bash", description: "Server management and automation.", example: "#!/bin/bash" }, { id: "do-os-2", title: "Python/Go", description: "Scripting for automation.", example: "boto3 for AWS" }] }
                ],
                project: "Automate a server setup task using a Bash script."
            },
            {
                title: "Containerization & Orchestration",
                modules: [
                    { id: "do-3", title: "Docker", steps: [{ id: "do-doc-1", title: "Containers", description: "Images, Containers, Dockerfiles.", example: "docker run nginx" }] },
                    { id: "do-4", title: "Kubernetes", steps: [{ id: "do-k8s-1", title: "Orchestration", description: "Pods, Services, Deployments.", example: "kubectl apply -f pod.yaml" }] }
                ],
                project: "Deploy a microservices app on a local Kubernetes cluster (Minikube)."
            },
            {
                title: "IaC & CI/CD",
                modules: [
                    { id: "do-5", title: "Infrastructure as Code", steps: [{ id: "do-iac-1", title: "Terraform", description: "Provisioning infrastructure.", example: "resource \"aws_instance\"" }] },
                    { id: "do-6", title: "CI/CD Pipelines", steps: [{ id: "do-ci-1", title: "Jenkins/GitHub Actions", description: "Automating build and deploy.", example: "pipeline { agent any ... }" }] }
                ],
                project: "Build a full CI/CD pipeline that deploys a Dockerized app to AWS/Azure."
            }
        ]
    },
    game: {
        title: "Game Development Roadmap",
        stages: [
            {
                title: "Foundations",
                modules: [
                    { id: "gd-1", title: "Programming", steps: [{ id: "gd-prog-1", title: "C# (Unity) or C++ (Unreal)", description: "The languages of game engines.", example: "void Update() { ... }" }] },
                    { id: "gd-2", title: "Math for Games", steps: [{ id: "gd-math-1", title: "Vectors & Physics", description: "Position, velocity, collision.", example: "Vector3.MoveTowards" }] }
                ],
                project: "Create a simple text-based adventure game."
            },
            {
                title: "Game Engines",
                modules: [
                    { id: "gd-3", title: "Unity or Unreal", steps: [{ id: "gd-eng-1", title: "The Editor", description: "Scene view, inspector, assets.", example: "Placing objects" }, { id: "gd-eng-2", title: "Scripting", description: "Attaching behaviors to objects.", example: "MonoBehaviours" }] }
                ],
                project: "Build a 2D platformer (like Mario) with one level."
            },
            {
                title: "Advanced Concepts",
                modules: [
                    { id: "gd-4", title: "Graphics & Audio", steps: [{ id: "gd-adv-1", title: "Shaders & Materials", description: "Visual effects.", example: "Shader Graph" }, { id: "gd-adv-2", title: "Sound Design", description: "SFX and Music.", example: "AudioSource" }] },
                    { id: "gd-5", title: "Polishing", steps: [{ id: "gd-pol-1", title: "UI/UX", description: "Menus, HUDs.", example: "Canvas system" }] }
                ],
                project: "Create a 3D endless runner game."
            }
        ]
    },
    desktop: {
        title: "Desktop App Development Roadmap",
        stages: [
            {
                title: "Framework Choice",
                modules: [
                    { id: "da-1", title: "Choose a Path", steps: [{ id: "da-path-1", title: "Electron (JS)", description: "Cross-platform using web tech.", example: "VS Code, Discord" }, { id: "da-path-2", title: "Native (C#/.NET, Swift, C++)", description: "Platform specific performance.", example: "WPF, Cocoa" }] }
                ],
                project: "Research and choose a framework based on your goals."
            },
            {
                title: "Development",
                modules: [
                    { id: "da-2", title: "Core Concepts", steps: [{ id: "da-core-1", title: "Window Management", description: "Creating and managing windows.", example: "BrowserWindow in Electron" }, { id: "da-core-2", title: "File System Access", description: "Reading/Writing local files.", example: "fs module" }] }
                ],
                project: "Build a simple Markdown editor."
            }
        ]
    },
    embedded: {
        title: "Embedded Systems Roadmap",
        stages: [
            {
                title: "Electronics & C",
                modules: [
                    { id: "emb-1", title: "C/C++", steps: [{ id: "emb-c-1", title: "Low-level Programming", description: "Pointers, memory management.", example: "Direct register access" }] },
                    { id: "emb-2", title: "Basic Electronics", steps: [{ id: "emb-el-1", title: "Circuits", description: "Voltage, current, resistance, components.", example: "Ohm's Law" }] }
                ],
                project: "Blink an LED using a microcontroller (Arduino/STM32)."
            },
            {
                title: "Microcontrollers",
                modules: [
                    { id: "emb-3", title: "MCU Basics", steps: [{ id: "emb-mcu-1", title: "GPIO, ADC, PWM", description: "Interfacing with the world.", example: "Reading a sensor" }, { id: "emb-mcu-2", title: "Communication Protocols", description: "UART, I2C, SPI.", example: "Talking to a display" }] }
                ],
                project: "Build a digital thermometer."
            }
        ]
    },
    robotics: {
        title: "Robotics Roadmap",
        stages: [
            {
                title: "Foundations",
                modules: [
                    { id: "rob-1", title: "Programming & Math", steps: [{ id: "rob-prog-1", title: "Python & C++", description: "Standard languages in robotics.", example: "ROS uses both" }, { id: "rob-math-1", title: "Linear Algebra", description: "Transformations, kinematics.", example: "Matrices" }] }
                ],
                project: "Write a program to simulate a robot arm moving."
            },
            {
                title: "ROS (Robot Operating System)",
                modules: [
                    { id: "rob-2", title: "ROS Basics", steps: [{ id: "rob-ros-1", title: "Nodes & Topics", description: "Pub/Sub architecture.", example: "rostopic echo" }, { id: "rob-ros-2", title: "Simulation (Gazebo)", description: "Testing without hardware.", example: "Simulating a rover" }] }
                ],
                project: "Control a simulated robot to navigate a maze."
            }
        ]
    },
    cloudengineering: {
        title: "Cloud Engineering Roadmap",
        stages: [
            {
                title: "Cloud Basics",
                modules: [
                    { id: "ce-1", title: "Cloud Providers", steps: [{ id: "ce-prov-1", title: "AWS/Azure/GCP", description: "Understand the major players.", example: "EC2, S3, Lambda" }] },
                    { id: "ce-2", title: "Core Services", steps: [{ id: "ce-core-1", title: "Compute, Storage, Network", description: "The building blocks.", example: "VMs, Blob Storage, VPCs" }] }
                ],
                project: "Host a static website on S3 or Azure Blob Storage."
            }
        ]
    },
    networkadmin: {
        title: "Network Administration Roadmap",
        stages: [
            {
                title: "Networking Fundamentals",
                modules: [
                    { id: "na-1", title: "Protocols & Hardware", steps: [{ id: "na-prot-1", title: "TCP/IP, DNS, DHCP", description: "How networks function.", example: "Subnetting" }, { id: "na-hw-1", title: "Routers & Switches", description: "Physical infrastructure.", example: "Cisco IOS" }] }
                ],
                project: "Design a small office network topology."
            }
        ]
    },
    systemadmin: {
        title: "Systems Administration Roadmap",
        stages: [
            {
                title: "OS Management",
                modules: [
                    { id: "sa-1", title: "Linux/Windows Server", steps: [{ id: "sa-os-1", title: "User Management", description: "Permissions, groups, AD.", example: "Active Directory" }, { id: "sa-os-2", title: "Services & Security", description: "Firewalls, updates, backups.", example: "Systemd, Cron" }] }
                ],
                project: "Set up a web server (Apache/Nginx) and secure it."
            }
        ]
    },
    cloudarchitect: {
        title: "Cloud Architecture Roadmap",
        stages: [
            {
                title: "Design Principles",
                modules: [
                    { id: "ca-1", title: "Well-Architected Framework", steps: [{ id: "ca-waf-1", title: "Reliability, Security, Cost", description: "Best practices for cloud design.", example: "High Availability" }] }
                ],
                project: "Design a highly available, fault-tolerant architecture for a web app."
            }
        ]
    },
    itsupport: {
        title: "IT Support Roadmap",
        stages: [
            {
                title: "Troubleshooting",
                modules: [
                    { id: "it-1", title: "Hardware & Software", steps: [{ id: "it-ts-1", title: "Diagnostics", description: "Identifying and fixing issues.", example: "Blue screen analysis" }, { id: "it-ts-2", title: "Customer Service", description: "Communicating with users.", example: "Ticket management" }] }
                ],
                project: "Resolve a series of simulated IT support tickets."
            }
        ]
    },
    uidesign: {
        title: "UI/UX Design Roadmap",
        stages: [
            {
                title: "Design Fundamentals",
                modules: [
                    { id: "ui-1", title: "Visual Design", steps: [{ id: "ui-vis-1", title: "Typography, Color, Layout", description: "Making things look good.", example: "Hierarchy" }, { id: "ui-vis-2", title: "Tools (Figma/Adobe XD)", description: "Mastering design software.", example: "Prototyping" }] }
                ],
                project: "Redesign the landing page of a popular website."
            }
        ]
    },
    interactiondesign: {
        title: "Interaction Design Roadmap",
        stages: [
            {
                title: "User Flow",
                modules: [
                    { id: "ix-1", title: "Interactions", steps: [{ id: "ix-int-1", title: "Micro-interactions", description: "Animations and feedback.", example: "Button hover states" }, { id: "ix-int-2", title: "Wireframing", description: "Structuring the experience.", example: "Low-fidelity mockups" }] }
                ],
                project: "Create an interactive prototype for a mobile app."
            }
        ]
    },
    graphicdesign: {
        title: "Graphic Design Roadmap",
        stages: [
            {
                title: "Visual Communication",
                modules: [
                    { id: "gr-1", title: "Design Principles", steps: [{ id: "gr-prin-1", title: "Composition & Branding", description: "Logos, posters, identity.", example: "Brand guidelines" }] }
                ],
                project: "Create a brand identity package (logo, business card, letterhead)."
            }
        ]
    },
    "3dmodeling": {
        title: "3D Modeling Roadmap",
        stages: [
            {
                title: "Modeling Basics",
                modules: [
                    { id: "3d-1", title: "Tools (Blender/Maya)", steps: [{ id: "3d-tool-1", title: "Mesh Modeling", description: "Vertices, edges, faces.", example: "Low-poly character" }, { id: "3d-tool-2", title: "Texturing & Lighting", description: "Adding realism.", example: "UV Mapping" }] }
                ],
                project: "Model and render a photorealistic room."
            }
        ]
    },
    videoediting: {
        title: "Video Editing Roadmap",
        stages: [
            {
                title: "Editing Basics",
                modules: [
                    { id: "vid-1", title: "Software (Premiere/DaVinci)", steps: [{ id: "vid-soft-1", title: "Cutting & Assembling", description: "Timeline management.", example: "Montage" }, { id: "vid-soft-2", title: "Color Correction & Audio", description: "Polishing the output.", example: "Grading" }] }
                ],
                project: "Edit a 1-minute promotional video."
            }
        ]
    },
    digitalmarketing: {
        title: "Digital Marketing Roadmap",
        stages: [
            {
                title: "Marketing Channels",
                modules: [
                    { id: "dm-1", title: "Overview", steps: [{ id: "dm-ch-1", title: "SEO, SEM, Social", description: "Understanding traffic sources.", example: "Organic vs Paid" }] }
                ],
                project: "Create a marketing plan for a fictional product."
            }
        ]
    },
    seospecialist: {
        title: "SEO Specialist Roadmap",
        stages: [
            {
                title: "Optimization",
                modules: [
                    { id: "seo-1", title: "On-Page & Off-Page", steps: [{ id: "seo-opt-1", title: "Keywords & Content", description: "Ranking factors.", example: "Keyword research" }, { id: "seo-opt-2", title: "Technical SEO", description: "Site speed, indexing.", example: "Sitemap.xml" }] }
                ],
                project: "Perform an SEO audit of a website."
            }
        ]
    },
    socialmediamanager: {
        title: "Social Media Manager Roadmap",
        stages: [
            {
                title: "Strategy",
                modules: [
                    { id: "smm-1", title: "Content Strategy", steps: [{ id: "smm-str-1", title: "Planning & Scheduling", description: "Calendars and engagement.", example: "Buffer/Hootsuite" }] }
                ],
                project: "Create a one-month content calendar for a brand."
            }
        ]
    },
    contentcreator: {
        title: "Content Creator Roadmap",
        stages: [
            {
                title: "Production",
                modules: [
                    { id: "cc-1", title: "Storytelling", steps: [{ id: "cc-story-1", title: "Writing & Scripting", description: "Engaging the audience.", example: "Hook, Body, CTA" }] }
                ],
                project: "Produce and publish a piece of content (blog, video, podcast)."
            }
        ]
    },
    emailmarketing: {
        title: "Email Marketing Roadmap",
        stages: [
            {
                title: "Campaigns",
                modules: [
                    { id: "em-1", title: "List Building", steps: [{ id: "em-list-1", title: "Segmentation & Automation", description: "Targeted messaging.", example: "Welcome sequence" }] }
                ],
                project: "Design an email newsletter campaign."
            }
        ]
    },
    ppcspecialist: {
        title: "PPC Specialist Roadmap",
        stages: [
            {
                title: "Paid Ads",
                modules: [
                    { id: "ppc-1", title: "Ad Platforms", steps: [{ id: "ppc-plat-1", title: "Google Ads & Facebook Ads", description: "Bidding, targeting, analytics.", example: "CPC, CTR, ROAS" }] }
                ],
                project: "Set up a mock Google Ads campaign."
            }
        ]
    },
    projectmanager: {
        title: "Project Management Roadmap",
        stages: [
            {
                title: "Methodologies",
                modules: [
                    { id: "pm-1", title: "Agile & Waterfall", steps: [{ id: "pm-meth-1", title: "Scrum & Kanban", description: "Managing workflows.", example: "Sprints, Standups" }] }
                ],
                project: "Manage a small project using Trello or Jira."
            }
        ]
    },
    businessanalyst: {
        title: "Business Analyst Roadmap",
        stages: [
            {
                title: "Analysis",
                modules: [
                    { id: "ba-1", title: "Requirements Gathering", steps: [{ id: "ba-req-1", title: "Stakeholder Interviews", description: "Understanding needs.", example: "User Stories" }, { id: "ba-req-2", title: "Process Modeling", description: "Flowcharts, BPMN.", example: "As-Is vs To-Be" }] }
                ],
                project: "Create a Business Requirements Document (BRD) for a new feature."
            }
        ]
    },
    financialanalyst: {
        title: "Financial Analyst Roadmap",
        stages: [
            {
                title: "Finance Basics",
                modules: [
                    { id: "fa-1", title: "Accounting & Modeling", steps: [{ id: "fa-acc-1", title: "Financial Statements", description: "Balance sheet, Income statement.", example: "Ratio analysis" }, { id: "fa-acc-2", title: "Excel Modeling", description: "Forecasting and valuation.", example: "DCF Model" }] }
                ],
                project: "Analyze the financial health of a public company."
            }
        ]
    },
    accountant: {
        title: "Accountant Roadmap",
        stages: [
            {
                title: "Accounting Principles",
                modules: [
                    { id: "ac-1", title: "GAAP/IFRS", steps: [{ id: "ac-prin-1", title: "Bookkeeping", description: "Recording transactions.", example: "Debits and Credits" }] }
                ],
                project: "Prepare a mock set of financial statements."
            }
        ]
    },
    productmanager: {
        title: "Product Management Roadmap",
        stages: [
            {
                title: "Product Lifecycle",
                modules: [
                    { id: "prod-1", title: "Strategy to Launch", steps: [{ id: "prod-life-1", title: "Market Research", description: "Product-Market Fit.", example: "Competitor analysis" }, { id: "prod-life-2", title: "Roadmapping", description: "Prioritizing features.", example: "MVP definition" }] }
                ],
                project: "Create a product roadmap for a new mobile app."
            }
        ]
    },
    hrspecialist: {
        title: "HR Specialist Roadmap",
        stages: [
            {
                title: "HR Functions",
                modules: [
                    { id: "hr-1", title: "Recruitment & Ops", steps: [{ id: "hr-func-1", title: "Talent Acquisition", description: "Hiring process.", example: "Interviewing" }, { id: "hr-func-2", title: "Employee Relations", description: "Culture and conflict.", example: "Onboarding" }] }
                ],
                project: "Design an onboarding process for new hires."
            }
        ]
    },
    blockchain: {
        title: "Blockchain Development Roadmap",
        stages: [
            {
                title: "Blockchain Basics",
                modules: [
                    { id: "bc-1", title: "Fundamentals", steps: [{ id: "bc-fund-1", title: "Distributed Ledger", description: "How it works.", example: "Consensus mechanisms" }] },
                    { id: "bc-2", title: "Smart Contracts", steps: [{ id: "bc-sc-1", title: "Solidity (Ethereum)", description: "Writing contracts.", example: "ERC-20 Token" }] }
                ],
                project: "Create and deploy a simple Smart Contract."
            }
        ]
    },
    quantumcomputing: {
        title: "Quantum Computing Roadmap",
        stages: [
            {
                title: "Quantum Physics & Math",
                modules: [
                    { id: "qc-1", title: "Theory", steps: [{ id: "qc-th-1", title: "Qubits & Superposition", description: "Quantum mechanics basics.", example: "Entanglement" }] },
                    { id: "qc-2", title: "Programming", steps: [{ id: "qc-prog-1", title: "Qiskit (IBM)", description: "Writing quantum circuits.", example: "Hadamard gate" }] }
                ],
                project: "Run a simple quantum circuit simulation."
            }
        ]
    },
    iot: {
        title: "IoT Development Roadmap",
        stages: [
            {
                title: "Connectivity",
                modules: [
                    { id: "iot-1", title: "Protocols", steps: [{ id: "iot-prot-1", title: "MQTT, CoAP", description: "Lightweight messaging.", example: "Pub/Sub" }] },
                    { id: "iot-2", title: "Hardware", steps: [{ id: "iot-hw-1", title: "Sensors & Actuators", description: "Interfacing with the physical world.", example: "ESP32, Raspberry Pi" }] }
                ],
                project: "Build a smart home sensor that logs data to the cloud."
            }
        ]
    },
    arvr: {
        title: "AR/VR Development Roadmap",
        stages: [
            {
                title: "Immersive Tech",
                modules: [
                    { id: "arvr-1", title: "Platforms", steps: [{ id: "arvr-plat-1", title: "Unity/Unreal (XR)", description: "Building 3D worlds.", example: "Oculus Quest dev" }, { id: "arvr-plat-2", title: "WebXR", description: "VR in the browser.", example: "A-Frame" }] }
                ],
                project: "Create a simple AR app that places a 3D object in the real world."
            }
        ]
    }
};
