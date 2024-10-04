import express, { json } from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import empresasRoutes from './routes/empresas.routes.js';
import sucursalesRoutes from './routes/sucursales.routes.js';

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Registrar el helper eq
app.engine('.hbs', engine({
    helpers: {
        eq: function (a, b) {
            return a === b;
        }
    },
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

// Middlewares
app.use(morgan('idx'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});
app.use(empresasRoutes);
app.use(sucursalesRoutes);

// Archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Ejecutar servidor
app.listen(app.get('port'), () =>
    console.log('Server listening on port', app.get('port')));
