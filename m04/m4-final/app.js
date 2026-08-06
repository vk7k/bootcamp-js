// ----------------------------------------------------------------
// CLASE UserManager
// ----------------------------------------------------------------
class UserManager {
    constructor() {
        this.users = [];
        // Guardamos la promesa de carga para que todos los métodos esperen
        this.promise = this._cargarDatos();
    }

    // ------------------------------------------------------------
    // 1. Carga los datos con XMLHttpRequest
    // ------------------------------------------------------------
    _cargarDatos() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        this.users = JSON.parse(xhr.responseText);
                        console.log('✅ Datos cargados correctamente:', this.users.length, 'usuarios');
                        resolve(this.users);
                    } catch (e) {
                        reject('Error al parsear JSON: ' + e.message);
                    }
                } else {
                    reject('Error HTTP: ' + xhr.status + ' ' + xhr.statusText);
                }
            };
            xhr.onerror = () => reject('Error de red o conexión');
            xhr.send();
        });
    }

    // ------------------------------------------------------------
    // 2. Método auxiliar: esperar a que los datos estén listos
    // ------------------------------------------------------------
    async _esperarDatos() {
        await this.promise;
        return this.users;
    }

    // ------------------------------------------------------------
    // 3. Listar nombres de todos los usuarios
    // ------------------------------------------------------------
    async listarNombres() {
        await this._esperarDatos();
        const nombres = this.users.map(u => u.name);
        const resultado = '📋 Nombres de usuarios:\n' + nombres.join('\n');
        console.log(resultado);
        return resultado;
    }

    // ------------------------------------------------------------
    // 4. Pedir nombre por prompt y mostrar username + email
    // ------------------------------------------------------------
    async buscarUsuarioPorPrompt() {
        await this._esperarDatos();
        const nombreBuscado = prompt('Ingresa el nombre del usuario (ej: Leanne Graham):');
        if (!nombreBuscado) return '❌ Búsqueda cancelada.';
        const usuario = this.users.find(u => u.name.toLowerCase() === nombreBuscado.trim().toLowerCase());
        if (!usuario) {
            const msg = `❌ No se encontró un usuario con el nombre "${nombreBuscado}"`;
            console.log(msg);
            return msg;
        }
        const msg = `👤 Usuario encontrado:\nUsername: ${usuario.username}\nEmail: ${usuario.email}`;
        console.log(msg);
        return msg;
    }

    // ------------------------------------------------------------
    // 5. Pedir nombre por prompt y mostrar dirección (todos los campos)
    // ------------------------------------------------------------
    async listarDireccionPorPrompt() {
        await this._esperarDatos();
        const nombreBuscado = prompt('Ingresa el nombre del usuario para ver su dirección (ej: Patricia Lebsack):');
        if (!nombreBuscado) return '❌ Búsqueda cancelada.';
        const usuario = this.users.find(u => u.name.toLowerCase() === nombreBuscado.trim().toLowerCase());
        if (!usuario) {
            const msg = `❌ No se encontró un usuario con el nombre "${nombreBuscado}"`;
            console.log(msg);
            return msg;
        }
        const dir = usuario.address;
        const msg = `📍 Dirección de ${usuario.name}:\n` +
            `Calle: ${dir.street}\nSuite: ${dir.suite}\nCiudad: ${dir.city}\nCódigo postal: ${dir.zipcode}\n` +
            `Geo: lat ${dir.geo.lat}, lng ${dir.geo.lng}`;
        console.log(msg);
        return msg;
    }

    // ------------------------------------------------------------
    // 6. Pedir nombre por prompt y mostrar info avanzada (teléfono, web, compañía)
    // ------------------------------------------------------------
    async listarInfoAvanzadaPorPrompt() {
        await this._esperarDatos();
        const nombreBuscado = prompt('Ingresa el nombre del usuario para ver info avanzada (ej: Leanne Graham):');
        if (!nombreBuscado) return '❌ Búsqueda cancelada.';
        const usuario = this.users.find(u => u.name.toLowerCase() === nombreBuscado.trim().toLowerCase());
        if (!usuario) {
            const msg = `❌ No se encontró un usuario con el nombre "${nombreBuscado}"`;
            console.log(msg);
            return msg;
        }
        const comp = usuario.company;
        const msg = `📊 Info avanzada de ${usuario.name}:\n` +
            `Teléfono: ${usuario.phone}\nSitio web: ${usuario.website}\n` +
            `Compañía: ${comp.name}\nFrase (catchPhrase): ${comp.catchPhrase}\n` +
            `BS: ${comp.bs}`;
        console.log(msg);
        return msg;
    }

    // ------------------------------------------------------------
    // 7. Listar todas las compañías junto a su catchPhrase
    // ------------------------------------------------------------
    async listarCompanias() {
        await this._esperarDatos();
        const companias = this.users.map(u => ({
            nombre: u.company.name,
            frase: u.company.catchPhrase
        }));
        let resultado = '🏢 Compañías y sus frases:\n';
        companias.forEach((c, i) => {
            resultado += `${i+1}. ${c.nombre} → "${c.frase}"\n`;
        });
        console.log(resultado);
        return resultado;
    }

    // ------------------------------------------------------------
    // 8. Listar nombres de todos los usuarios ordenados alfabéticamente
    // ------------------------------------------------------------
    async listarNombresOrdenados() {
        await this._esperarDatos();
        const nombres = this.users.map(u => u.name).sort((a, b) => a.localeCompare(b));
        const resultado = '🔤 Nombres ordenados alfabéticamente:\n' + nombres.join('\n');
        console.log(resultado);
        return resultado;
    }
}

// ----------------------------------------------------------------
// INSTANCIA DE LA CLASE Y MANEJO DE BOTONES
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const manager = new UserManager();

    // Función auxiliar para mostrar resultados en pantalla
    async function mostrarResultado(callback) {
        try {
            // Mostrar estado de carga
            output.innerHTML = '⏳ Procesando...';
            // Ejecutar el método y obtener el resultado
            const resultado = await callback.call(manager);
            output.innerHTML = resultado;
        } catch (error) {
            output.innerHTML = `❌ Error: ${error}`;
            console.error(error);
        }
    }

    // Asignar eventos a cada botón
    document.getElementById('btnListarNombres').addEventListener('click', () => {
        mostrarResultado(manager.listarNombres);
    });

    document.getElementById('btnBuscarUsuario').addEventListener('click', () => {
        mostrarResultado(manager.buscarUsuarioPorPrompt);
    });

    document.getElementById('btnDireccion').addEventListener('click', () => {
        mostrarResultado(manager.listarDireccionPorPrompt);
    });

    document.getElementById('btnInfoAvanzada').addEventListener('click', () => {
        mostrarResultado(manager.listarInfoAvanzadaPorPrompt);
    });

    document.getElementById('btnCompanias').addEventListener('click', () => {
        mostrarResultado(manager.listarCompanias);
    });

    document.getElementById('btnOrdenados').addEventListener('click', () => {
        mostrarResultado(manager.listarNombresOrdenados);
    });

    // Al cargar, mostrar mensaje de espera hasta que los datos estén listos
    manager._esperarDatos().then(() => {
        output.innerHTML = '✅ Datos cargados. Presiona un botón para comenzar.';
    }).catch(err => {
        output.innerHTML = `❌ Error al cargar datos: ${err}`;
    });
});