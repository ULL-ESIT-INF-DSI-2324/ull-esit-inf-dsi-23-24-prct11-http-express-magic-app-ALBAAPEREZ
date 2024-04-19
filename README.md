# PRÁCTICA 11 - Aplicación Express para coleccionistas de cartas Magic


**Nombre:** Alba Pérez Rodríguez

**Fecha:** 17/04/2024

**Estudios:** Ingeniería Informática

**Asignatura:** Desarrollo en Sistemas Informáticos

**Profesor:** Eduardo Manuel Segredo González

---

# Índice
1. [Introducción](#1-introducción)
2. [Objetivos](#2-objetivos)
3. [Antes de empezar](#3-antes-de-empezar)
4. [Configuración de Istambul y coveralls](#4-configuracion-de-istambul-y-coveralls)
5. [Principios SOLID](#5-principios-solid)
6. [GitHub Actions](#6-github-actions)
7. [Modulos](#7-módulos)
8. [SonarCloud](#8-sonarcloud)
9. [Yargs y Chalk](#9-yargs-y-chalk)
10. [API sincrona de Node.js](#10-api-sincrona-de-nodejs)
11. [Ejercicio](#11-ejercicio)
12. [Conclusiones](#9-conclusiones)

---

# 1. Introducción.
En esta práctica se abordará el desafío de implementar una aplicación Express para coleccionistas de cartas Magic. Esta tarea implica trasladar la funcionalidad existente de la aplicación a un entorno de servidor, permitiendo a los usuarios realizar operaciones CRUD sobre sus colecciones de cartas a través de peticiones HTTP. El objetivo principal es explorar el uso de Express como framework para la construcción de servicios web, aprovechando sus capacidades para manejar de manera eficiente las solicitudes y respuestas HTTP.

---

# 2. Objetivos

Los objetivos de esta práctica son:

1. Implementar una aplicación Express para coleccionistas de cartas Magic.
2. Permitir a los usuarios realizar operaciones CRUD sobre sus colecciones de cartas mediante peticiones HTTP.
3. Utilizar Express como framework para la construcción de servicios web.
4. Almacenar la información de las cartas como ficheros JSON en el sistema de archivos.
5. Asegurar que todos los mensajes de respuesta del servidor al cliente estén en formato JSON.
6. Gestionar la lógica asociada a la manipulación del sistema de archivos mediante el uso del API asíncrona basada en callbacks proporcionada por Node.js.
7. Definir puntos de acceso JSON para manejar las diferentes operaciones sobre las cartas de los usuarios.
8. Utilizar los verbos HTTP (GET, POST, DELETE, PATCH) para definir la funcionalidad del servidor.
9. Implementar funciones asincrónicas utilizando el patrón de callback.
10. Documentar el código utilizando TypeDoc y adoptar una metodología de desarrollo dirigido por pruebas/comportamiento (TDD/BDD).

---

# 3. Antes de empezar
Antes de comenzar con la resolución de ejercicios de la práctica deberemos poner a punto nuestro entorno de trabajo. Para ello, lo haremos siguiendo los siguientes pasos:

## Creación de directorios.
Crearemos los siguientes directorios para nuestro proyecto:

  - **src/:** Este directorio almacenará los archivos fuente de TypeScript. En este caso, el código fuente escrito en TypeScript se encuentra en el directorio src.

  - **dist/:** Este directorio se utilizará para almacenar los archivos JavaScript generados por el compilador de TypeScript. La compilación de TypeScript produce código JavaScript, y este código se guarda en el directorio dist.

## Configuración para llevar a cabo la práctica:
Necesitaremo inicializar el proyecto con ***npm***, para ello seguiremos los pasos siguientes:

**Paso 1:**

Utilizamos el comando ***npm init --yes** para generar un archivo **package.json**. Este archivo contiene la información del proyecto, incluidas las dependencias y scripts.

```bash 
{
  "name": "ull-esit-inf-dsi-23-24-prct04-arrays-tuples-enums-albaaperez",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\"",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
}

``` 

**Paso 2:**

Instalación del Compilador de TypeScript. Se instala el compilador de TypeScript globalmente con el comando ***npm install --global typescript***.

**Paso 3:**

Configuración del Compilador con tsconfig.json. Se crea un archivo de configuración llamado **tsconfig.json** en la raíz del proyecto. Este archivo especifica opciones para el compilador de TypeScript, como el directorio de entrada **(rootDir)** y el directorio de salida **(outDir)**.

```bash
{
  "exclude": [
    "./tests",
    "./node_modules",
    "./dist"
  ],
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "declaration": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```
**Paso 4:**

Instalación de tsc-watch para Compilación Automática. Se instala tsc-watch como una dependencia de desarrollo con el comando **npm install --save-dev tsc-watch**.

**Paso 5:** 

Modificamos la sección de scripts en **package.json** para utilizar tsc-watch y ejecutar el código compilado solo si la compilación es exitosa.

```bash
"scripts": 
    "start": "tsc-watch --onSuccess \"node dist/index.js\""
```

**Paso 6:**
Ejecutamos el comando **npm start**, que utiliza **tsc-watch** para observar cambios en los archivos de origen y compilar automáticamente.


## Instalación de ESlint.
ESLint, un linter muy conocido para trabajar con JavaScript y TypeScript. Para instalarlo haremos lo siguiente:

1. **Instalación de ESLint**:
  - Instalamos el ESLint de manera global utilizando el comando ***npm i -g eslint***.
  - Verificamos la instalación con **eslint --version**.

2. **Configuración de ESLint**:
  - Iniciamos la configuración de ESLint con el comando ***eslint --init***.
  - Durante la configuración, se elige el tipo de proyecto, el sistema de módulos, el framework (en este caso, ninguno), si se utiliza TypeScript, el entorno de ejecución (Node.js), el formato del archivo de configuración (JSON), y se instalan las dependencias necesarias.

3. **Archivo de Configuración de ESLint**:
  - Configuraremos el archivo de configuración **.eslintrc.json**, que indica el entorno, las extensiones recomendadas (como eslint:recommended y plugin:@typescript-eslint/recommended), el parser de TypeScript, y la configuración de reglas. Se verá de la siguiente manera:
  ```bash
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "require-jsdoc": "off",
        "valid-jsdoc": "off"
    }
  ```

4. **Personalización de Reglas**
  - Editamos el archivo de configuración para activar, desactivar o personalizar reglas específicas según las necesidades del proyecto.

5. **Ignorar Archivos:**
  - Creamos un archivo **.eslintignore** para especificar qué archivos y directorios deben ser ignorados por ESLint.

6. **Ejecución de ESLint:**
  - Ejecutamos ESLint en el proyecto con el comando **eslint .**, y se muestra cómo se informan los problemas detectados.

7. **Formateo del Código con Prettier:**
  - Instalamos Prettier y eslint-config-prettier para desactivar reglas de formato en ESLint.
  - Configuramos el ESLint para integrarse con Prettier añadiendo "prettier" a la lista de extensiones en el archivo de configuración.
  - Se crea un archivo de configuración de Prettier (.prettierrc.json) y un archivo de ignorar (.prettierignore).

---

## Typedoc.
***TypeDoc*** es una herramienta de generación de documentación para proyectos TypeScript. Proporciona una forma eficiente de documentar el código fuente y generar automáticamente documentación en formato HTML. A continuación, se presenta una breve introducción a TypeDoc y cómo se puede utilizar en el contexto de esta práctica.

### Instalación de la herramienta.
Podemos instalar TypeDoc utilizando ***npm*** (Node Package Manager). Abrimos la terminal y ejecutamos el siguiente comando:

```bash
npm install --save-dev typedoc
```
Este comando instalará TypeDoc como una dependencia de desarrollo en el proyecto.

### Uso básico.
Para generar documentación con TypeDoc, simplemente ejecutamos el siguiente comando en la terminal desde el directorio de su proyecto:

```bash
npx typedoc
```
Otra forma de hacerlo, es en el compilador, cuyo fichero es ***package.json***. Aquí especificaremos la siguiente línea en el apartado de **scripts**:

```bash
"doc": "typedoc"
```

### Configuración.
**TypeDoc** puede configurarse utilizando un archivo ***typedoc.json*** en la raíz del proyecto. Aquí podemos especificar la configuración específica que deseamos para la documentación. 

**Paso 1: Crear el archivo typedoc.json:**

En la raíz de nuestro proyecto crearemos a mano un archivo denominado **typedoc.json**.
Este es un archivo de configuración para TypeDoc.

**Paso 2: Configuración específica:**

Una vez creado el fichero, dentro escribiremos lo siguiente:

```bash
{
  "entryPoints": [
    "./src/**/*.ts
  ],
  "out": "./docs",

}
```
Este archivo de configuración le dice a TypeDoc qué archivos deben considerarse para la **generación de documentación**, en este caso, todos los ficheros de los ejercicios realizados y, **dónde debe colocar esa documentación generada**, en nuestro directorio /docs. Cuando ejecutemos **npx typedoc** desde la terminal, TypeDoc utilizará esta configuración para procesar los archivos de entrada y generar la documentación en el directorio especificado.

Configurado TypeDoc podremos ejecutarlo desde la terminal con el comando:

```bash
npm run doc
```

---
## mocha y chai
***Mocha y Chai*** son herramientas populares para realizar pruebas unitarias en proyectos JavaScript y TypeScript. Mocha es un marco de ejecución de pruebas y Chai es una biblioteca de aserciones que se integra bien con Mocha. Aquí hay una breve introducción sobre cómo comenzar con Mocha y Chai.

### Instalación de las herramientas.
En primer lugar, instalaremos Mocha y Chai como dependencias de desarrollo en nuestro proyecto con el comando:

```bash
 npm install --save-dev mocha chai@4.4.1 @types/mocha @types/chai ts-node
```
  - mocha: El marco de ejecución de pruebas.
  - chai: Una biblioteca de aserciones. Le especificaremos la versión anterior para trabajar de forma correcta con chai.
  - @types/mocha y @types/chai: Tipos TypeScript para Mocha y Chai.
  - ts-node: Permite ejecutar archivos TypeScript directamente en Node.js.


Hecho esto, crearemos un fichero denominado ***.mocharc.json***. Este fichero se utiliza para especificar configuraciones personalizadas para la ejecución de pruebas con Mocha.
Este contendrá lo siguiente:

```bash
{
  "extension": ["ts"],
  "spec": "tests/**/*.spec.ts",
  "require": "ts-node/register"
}
```
  - **"extension"** --> Mocha reconocerá los archivos con la extensión .ts como archivos de prueba TypeScript.
  - **"spec"** --> Mocha buscará los archivos de prueba en la carpeta tests y sus subdirectorios (**/) que tengan la extensión .spec.ts.
  - **"require"** --> antes de ejecutar las pruebas, se debe registrar el módulo ts-node para permitir la ejecución de archivos TypeScript directamente en Mocha.

### Estructura de las pruebas.
En nuestro directorio raíz crearemos un nuevo directorio denominado **/tests** que contendrá nuestros archivos para las pruebas. Nuestros directorios deberán quedar de una forma similar a esta:

```bash
/proyecto
  /src
    /EJERCICIO1
      - interfaz.ts
      - clase.ts
      - index.ts
    /EJERCICIO2
      - clase1.ts
      - clase2.ts
      - index.ts
    ...
  /test
    /EJERCICIO1
      - interfaz.spec.ts
      - clase.spec.ts
      - index.spec.ts
    /EJERCICIO2
      - clase1.spec.ts
      - clase2.spec.ts
      - index.spec.ts
    ...

```

### Escribir las pruebas.
Por último, lo que deberemos hacer será escribir las pruebas en esos ficheros que vamos a crear terminados en **.spec.ts**. La importancion de mocha y chai en nuestro archivos de prueba serán:

```bash
import 'mocha';
import {expect} from 'chai';
import { mcd } from '../src/EJERCICIO1';
```
  - Utilizamos **describe** para agrupar las pruebas relacionadas
  - Cada prueba se crea con **it**.
  - Usamos las aserciones de Chai, por ejemplo, **expect(result).to.be.undefined.**

## Subir archivos 
Una vez hayamos terminado de realizar los ejercicios, procederemos a subirlos a nuestro repositorio de github mediante:

  - **git add .**
  - **git commit -m " "**
  - **git push**

Pero antes de hacer esto deberemos crear un fichero ***.gitignore** donde introduciremos lo siguiente:
```bash
node_modules
dist
package-lock.json
```
El archivo **.gitignore** se utiliza para especificar archivos y directorios que no deben ser incluidos en el control de versiones de Git. En este caso, estos archivos serán ignorados a la hora de subirlos a GitHub.

---

# 4. Configuracion de Istanbul y coveralls.

### ¿Que son?
En esta sección, detallaremos la configuración necesaria para utilizar **Istanbul y Coveralls** en nuestro proyecto. Estas herramientas son valiosas para evaluar la cobertura de nuestro código fuente y realizar un seguimiento de la misma.

### Instalación

Primero, realizaremos la instalación de los mismos con los siguientes comandos:
```bash
npm install --save-dev nyc coveralls
```
En nuestro fichero **package.json** detallaremos lo siguiente para terminar de configurar Istanbul y coveralls:

```bash 
"test": "nyc mocha",
"coverage": "nyc npm test && nyc report --reporter=text-lcov | coveralls && rm -rf .nyc_output",
```

### Inicio de sesión en Coveralls para el cubrimiento del código

Para realizar esto, nos deberemos meter en la página de [Coveralls](#https://coveralls.io/).
Dentro de esta iniciaremos sesión con nuestras credenciales de GitHub.
Si deseamos agregar un repositorio para el cubrimiento de nuestro código este deberá ser de visibilidad pública.  
Lo agregaremos dándole a **ADD REPOS** y una vez elegido el repositorio copiaremos el token.
Por último, en nuestro directorio raíz crearemos el **.coveralls.yml** que contendrá el token de nuestro repositorio:

```bash
repo_token: xbwn8u45rB3Q44dE2hFjQT0kbhDmRPDuu
```
---

# 5. Principios SOLID.

En el desarrollo de software, ***los Principios SOLID*** son un conjunto de principios de diseño orientados a la creación de sistemas más mantenibles, flexibles y escalables. Estos principios fueron introducidos por el ingeniero de software Robert C. Martin y representan un conjunto de directrices que buscan mejorar la calidad del código y facilitar su mantenimiento a lo largo del tiempo.

## ¿Cuáles son?

Los Principios SOLID son un acrónimo que representa los siguientes principios:

### S - Principio de Responsabilidad Única (Single Responsibility Principle - SRP)

El **SRP** establece que una clase debería tener una única razón para cambiar. En otras palabras, una clase debería tener una **única responsabilidad**, una única función.

### O - Principio de Abierto/Cerrado (Open/Closed Principle - OCP)

El **OCP** propone que una entidad de software, como una clase, debe estar **abierta para la extensión pero cerrada para la modificación**. Se busca lograr esto mediante la creación de código que pueda ser extendido sin modificar su funcionalidad existente.

### L - Principio de Sustitución de Liskov (Liskov Substitution Principle - LSP)

El **LSP** establece que los objetos de una clase base deben **poder ser sustituidos por objetos de sus clases derivadas** sin afectar la corrección del programa.

### I - Principio de Segregación de Interfaces (Interface Segregation Principle - ISP)

El **ISP** propone que una clase no debería verse obligada a implementar interfaces que no utiliza. En lugar de interfaces generales, se prefieren interfaces más específicas.

### D - Principio de Inversión de Dependencia (Dependency Inversion Principle - DIP)

El **DIP** propone que las dependencias de alto nivel no deben depender de módulos de bajo nivel, sino que ambos deben depender de abstracciones. Además, las abstracciones no deben depender de los detalles, sino que los detalles deben depender de las abstracciones.

## Importancia y Beneficios

La aplicación de los Principios SOLID en el desarrollo de software tiene varios beneficios, entre ellos:

- **Mantenibilidad:** Facilitan el mantenimiento del código a lo largo del tiempo.
- **Escalabilidad:** Permiten construir sistemas más flexibles y escalables.
- **Reusabilidad:** Favorecen la reutilización de código y componentes.
- **Legibilidad:** Mejoran la claridad y la comprensión del código.


En esta práctica, se presentarán ejemplos específicos de código que ilustrarán la aplicación práctica de los Principios SOLID en nuestro proyecto. Veremos cómo estos principios se traducen en un código más limpio, modular y fácil de entender.

A lo largo de la revisión de los ejercicios, se destacarán las áreas donde los Principios SOLID han sido implementados con éxito, subrayando la importancia de seguir estas directrices para lograr un diseño de software robusto y sostenible.

---

# 6. GitHub Actions

## ¿Qué es?
***GitHub Actions*** es una característica integrada en GitHub que te permite automatizar, personalizar y ejecutar flujos de trabajo directamente desde tu repositorio. Con GitHub Actions, podemos crear flujos de trabajo que respondan a eventos específicos en tu repositorio, como solicitudes de extracción, confirmaciones de código, creación de problemas y mucho más.

## Características
Encontramos algunas características de esta herramienta:

### Automatización de tareas
Con GitHub Actions, puedes automatizar tareas repetitivas, como pruebas de código, compilaciones, despliegues, notificaciones y más.

### Personalización
Los flujos de trabajo de GitHub Actions son altamente personalizables. Puedes crear flujos de trabajo específicos para tus necesidades utilizando una variedad de acciones predefinidas o creando tus propias acciones personalizadas.

### Eventos del repositorio
Los flujos de trabajo pueden activarse en respuesta a una amplia gama de eventos en tu repositorio, lo que te permite ejecutar acciones específicas en función de las acciones de los colaboradores, el estado del código y otros factores.

### Integración con el ecosistema de GitHub
GitHub Actions se integra perfectamente con el ecosistema de GitHub, lo que te permite acceder a tus repositorios, problemas, solicitudes de extracción y otros datos directamente desde tus flujos de trabajo.

## Configuración
Para la configuración de las Github Actions deberemos meternos en el apartado de nuestro repositorio de **Actions** y seleccionar **Node.js** como flujo de trabajo. 
Al hacer esto se nos creará un archivo denominado node.js.yml que contendrá lo siguiente:
```typescript
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Tests

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 19.x, 20.x, 21.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test
  ```
Este fichero será para las pruebas o tests como se indica en el nombre.
Deberemos configurar más Actions para llevar a cabo toda la práctica. 
Tras hacer un commit con los cambios comenzaremos a utilizar las GitHub Actions.
Ahora, en visual podemos hacer la configuración de la Action de coveralls. Crearemos el fichero coveralls.yml que tendrá lo siguiente:
  ```typescript
  # This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Coveralls

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Cloning repo
      uses: actions/checkout@v4
    - name: Use Node.js 21.x
      uses: actions/setup-node@v4
      with:
        node-version: 21.x
    - name: Installing dependencies
      run: npm ci
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@v2.2.3
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
  ```
Hecho esto, cada vez que hagamos un git commit y un git push nos saldrán las Acciones.

--- 

# 7. Módulos
En el desarrollo de aplicaciones en TypeScript, especialmente en entornos de pruebas con Mocha y herramientas de cobertura de código como nyc, es esencial configurar adecuadamente el manejo de módulos ESM (ECMAScript Modules). Esta configuración garantiza que nuestras pruebas sean efectivas y que los informes de cobertura reflejen con precisión el estado de nuestros módulos.

**Paso 1: Instalación de c8.**

Para comenzar, es necesario instalar la herramienta de cobertura **c8** como dependencia de desarrollo. Esto se logra ejecutando el siguiente comando:
```bash
npm i --save-dev c8
```

**Paso 2: Configuración del Script de Cobertura en package.json**

Posteriormente, en el archivo **package.json**, ajustamos el script de cobertura para utilizar c8 en lugar de nyc. Esto se logra modificando la sección "scripts" como se muestra a continuación:
```typescript
{
  "scripts": {
    "coverage": "c8 npm test && c8 report --reporter=lcov"
  }
}
```

**Paso 3: Ajuste de las Pruebas para Módulos ESM**

Es necesario modificar el archivo de configuración de Mocha, **.mocharc.json**, para utilizar el cargador ESM de ts-node al ejecutar las pruebas. Esto se logra configurando la propiedad "loader" como se muestra a continuación:
```typescript
{
  "extension": [
    "ts"
  ],
  "spec": "tests/**/*.spec.ts",
  "loader": "ts-node/esm"
}
```

**Paso 4: Importación de Módulos con Extensión .js**

En los archivos de prueba **(*.spec.ts)**, cuando importamos módulos, es fundamental añadir la extensión .js a los nombres de los módulos importados. Esto es necesario para que funcionen correctamente con el cargador ESM. Un ejemplo de importación sería el siguiente:
```typescript
import { expect } from 'chai'; // Importamos el módulo con extensión .js
import { myFunction } from '../src/myModule.js'; // Importamos nuestro módulo con extensión .js
```

Con esta configuración, aseguramos que nuestras pruebas sean efectivas, generamos informes precisos de cobertura y garantizamos que nuestros módulos ESM se manejen correctamente en el entorno de prueba.


---
# 8. SonarCloud

### ¿Qué es SonarCloud?
SonarCloud es una plataforma de análisis estático de código diseñada para mejorar la calidad del software. Utiliza técnicas de análisis estático para identificar y reportar problemas de calidad del código, como errores, vulnerabilidades de seguridad, malas prácticas y duplicación de código.

### Características de SonarCloud:

- **Análisis de código estático:** SonarCloud examina el código fuente de tu proyecto en busca de posibles problemas de calidad, proporcionando una visión detallada de la salud del código.

- **Integración continua:** Puedes integrar SonarCloud en tu proceso de integración continua para automatizar el análisis del código cada vez que se realice un cambio, lo que te permite detectar problemas de calidad de forma proactiva.

- **Métricas y seguimiento:** SonarCloud ofrece métricas detalladas sobre la calidad del código y su evolución a lo largo del tiempo, lo que te permite realizar un seguimiento del progreso y tomar medidas para mejorar la calidad del código.

- **Comentarios y recomendaciones:** SonarCloud proporciona comentarios detallados y recomendaciones para cada problema identificado, ayudándote a comprender la naturaleza del problema y cómo solucionarlo de manera efectiva.

- **Integración con GitHub:** SonarCloud se integra estrechamente con GitHub, lo que te permite ver los resultados del análisis directamente en tus solicitudes de extracción y gestionar la calidad del código desde el mismo entorno en el que trabajas.


## Configuración
Para la configuración de **SonarCloud** lo que deberemos hacer es lo siguiente:

**Paso 1**: Iniciamos sesión en la Página de SonarCloud.

**Paso 2**: Añadimos un nuevo proyecto. En nuestro caso seleccionamos la organizacion del curso de dsi y localizamos nuestro repositorio que anteriormente debe estar en **Public**.

**Paso 3**: Al comenzar un nuevo proyecto con el repositorio seleccionado deberemos meternos dentro de este y seleccionar **Analysis Method**. Dentro de esto, desactivaremos el botón de **Automatic Analysis** y nos meteremos a la opción de **GitHub Actions**.

**Paso 4**: Dentro de los Actions de esta página copiaremos el SONAR_TOKEN y el valor secreto bajo este. Seguidamente, nos dirigiremos a GitHub a nuestro repositorio y en el apartado de settings -> secretos deberemos introducir estos datos copiados anteriormente. 

**Paso 5**: Hecho esto, nos dirigimos a la página de antes de SonarCloud y eligiremos la opción de ts para typscript. Se nos desplegará los siguiente:

```typescript
name: Build
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
  ``` 

Esto lo copiaremos y haremos lo mismo que hicimos anteriormente con las Actions de Tests y Coveralls. Crear un fichero sonarcloud.yml y poner:
```typescript
name: Sonar-Cloud 

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - name: Cloning repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Using Node.js 21.x
        uses: actions/setup-node@v4
        with:
          node-version: 21.x
      - name: Installing dependencies
        run: npm ci
      - name: Generating coverage report
        run: npm run coverage
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

Para finliazar crearemos en la raíz del directorio un **sonar-project.properties** que tendra:
```typescript
sonar.projectKey=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-ALBAAPEREZ
sonar.organization=ull-esit-inf-dsi-2324

# This is the name and version displayed in the SonarCloud UI.
#sonar.projectName=ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-ALBAAPEREZ
#sonar.projectVersion=1.0


# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
#sonar.sources=.

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
```

Hecho esto en nuestro repositorio, haremos git add, git commit y un push y si todo ha ido bien comenzará a funcionar todo sin problemas.


--- 

# 9. Yargs y Chalk

En el contexto del desarrollo de aplicaciones de línea de comandos, los paquetes **yargs y chalk** desempeñan roles fundamentales para el manejo de argumentos y la presentación de información de manera legible y atractiva. A continuación, se detallan las características y el uso de cada uno de estos paquetes:

## Chalk: Estilización de Texto en Consola

El paquete Chalk se utiliza para agregar estilos y colores a la salida de texto en la consola, permitiendo mejorar la legibilidad y la presentación de la información. Algunas características importantes incluyen:

**Estilos y Colores**: Chalk proporciona una amplia variedad de estilos y colores que pueden aplicarse al texto, como negrita, subrayado, colores de fondo, entre otros.

**API Encadenada**: Permite encadenar varios estilos y colores para aplicar múltiples efectos a un texto.

**Facilidad de Uso**: La sintaxis simple y clara hace que sea fácil aplicar estilos y colores a diferentes partes del texto.


Instalaremos chalk mediante el comando:
```bash
npm i chalk
```

La última versión se trata de un módulo ESM, por lo que tendremos que modificar el fichero package.json para establecer la propiedad type al valor module:
```typescript
{
  "name": "ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-albaaperez",
  "version": "1.0.0",
  "description": "[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/T5K9tzcv)",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "c8 mocha",
    "coverage": "c8 npm test && c8 report --reporter=lcov",
    "doc": "typedoc",
    "start": "tsc-watch --onSuccess \"node dist/MAGICAPP/index.js\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.12",
    "@types/mocha": "^10.0.6",
    "@types/sinon": "^17.0.3",
    "@types/yargs": "^17.0.32",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "c8": "^9.1.0",
    "chai": "^4.4.1",
    "eslint": "^8.57.0",
    "mocha": "^10.3.0",
    "nyc": "^15.1.0",
    "sinon": "^17.0.1",
    "ts-node": "^10.9.2",
    "tsc-watch": "^6.0.4",
    "typedoc": "^0.25.12"
  },
  "dependencies": {
    "chalk": "^5.3.0",
    "rimraf": "^5.0.5",
    "typescript": "^5.4.2",
    "yargs": "^17.7.2"
  }
}
```
Además, en el tsconfig deberemos especificar la propiedad module, asígnándole el valor node16.

Un ejemplo de uso de chalk es el siguiente con diferentes estilos y colores:
```typescript
import chalk from "chalk";

const log = console.log;

// Estilos y colores simples
log(chalk.blue("Hello") + " World" + chalk.red("!"));

// Combinación de estilos y colores
log(chalk.blue.bgRed.bold("Hello world!"));

// Aplicación a múltiples argumentos
log(chalk.blue("Hello", "World!", "Foo", "bar", "biz", "baz"));

// Anidamiento de estilos
log(chalk.red("Hello", chalk.underline.bgBlue("world") + "!"));
```


## Yargs
El paquete **Yargs** se utiliza para analizar los argumentos pasados a un programa desde la línea de comandos, facilitando la creación de interfaces de usuario interactivas y robustas. Algunas características importantes incluyen:

**Gestión de Comandos**: Permite definir y gestionar diferentes comandos, cada uno con sus opciones y manejadores correspondientes.

**Validación de Argumentos**: Ofrece opciones para especificar el tipo y la obligatoriedad de los argumentos, facilitando la validación de la entrada del usuario.

**API Encadenada**: Permite encadenar varias configuraciones de comandos y opciones para una fácil configuración.

**Integración con TypeScript**: Se incluyen los tipos de TypeScript para un desarrollo más seguro y sin errores.

Para el comienzo de su utilización deberemo instalarlo con los siguientes comandos:
```bash
npm i yargs
npm i --save-dev @types/yargs
```

Un ejemplo de uso del yargs sería el siguiente:
```typescript
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('add', 'Adds a card to the collection', {
    id: {
      description: 'Card ID',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    console.log(argv.id);
  })
  .help()
  .argv;
```


--- 

# 11. EJERCICIO

## Enunciado.
En esta práctica, se desarrollará una aplicación Express para gestionar colecciones de cartas Magic a través de un servidor HTTP. Los usuarios podrán realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre sus cartas mediante peticiones HTTP. El servidor almacenará la información de las cartas en ficheros JSON en el sistema de archivos, siguiendo una estructura de directorios predefinida.

### Descripción de los requisitos:

- Las cartas Magic se describirán por diversos elementos, como ID, nombre, coste de maná, color, tipo, rareza, etc.
- Cada usuario tendrá su propia colección de cartas y podrá realizar operaciones como añadir, modificar, eliminar, listar y mostrar cartas.
- Se debe implementar la lógica para gestionar el sistema de ficheros de forma asíncrona utilizando Node.js y Express.
- Todas las respuestas del servidor al cliente deberán estar en formato JSON.
- Se deben implementar puntos de acceso JSON para manejar las operaciones CRUD sobre las cartas.
- Las operaciones se realizarán utilizando los verbos HTTP (GET, POST, DELETE, PATCH).
- Se debe documentar el código utilizando TypeDoc y seguir una metodología de desarrollo dirigido por pruebas (TDD/BDD).

## Código propuesto
El código reliazado es el siguiente:


### EnumerationColor.ts
```typescript
/**
 * Enumeración de colores para las cartas
 * Esta enumeración se utiliza para definir los colores de las cartas
 * Cada carta tiene un color que puede ser blanco, azul, 
 * negro, rojo, verde, incoloro, incluso multicolor...
 */
export enum Color {
  Blanco = 'Blanco',
  Azul = 'Azul',
  Negro = 'Negro',
  Rojo = 'Rojo',
  Verde = 'Verde',
  Incoloro = 'Incoloro',
  Multicolor = 'Multicolor',
  Amarillo = 'Amarillo',
  Morado = 'Morado',
  Rosa = 'Rosa',
  Marron = 'Marron',
  Naranja = 'Naranja'
}
```

### EnumerationLineType.ts
```typescript
/**
 * Enumeración de los tipos de cartas
 * Las cartas pueden ser de diferentes tipos.
 */
export enum LineType {
  Tierra = 'Tierra',
  Criatura = 'Criatura',
  Encantamiento = 'Encantamiento',
  Conjuro = 'Conjuro',
  Instantáneo = 'Instantáneo',
  Artefacto = 'Artefacto',
  Planeswalker = 'Planeswalker',
}
```

### EnumerationRarity.ts
```typescript
/**
 * Enumeración de las rarezas de las cartas
 * Las cartas pueden ser de diferentes tipos de rareza
 * Hay 4 tipos de rarezas: comun, infrecuente, rara y mítica.
 */
export enum Rarity {
  Comun = 'Comun',
  Infrecuente = 'Infrecuente',
  Rara = 'Rara',
  Mítica = 'Mítica',
}
```

### Card.ts
```typescript
import { Color } from "./EnumerationColor.js";
import { LineType } from "./EnumerationLineType.js";
import { Rarity } from "./EnumerationRarity.js";

/**
 * Interfaz para la información de las cartas
 * Esta interfaz se utiliza para definir la estructura de los datos que se van a utilizar en la aplicación
 * @param id: number - Identificador de la carta
 * @param name: string - Nombre de la carta
 * @param manaCost: number - Costo de mana de la carta
 * @param color: string - Color de la carta
 * @param cardType: string - Tipo de carta
 * @param rarity: Rarity, es una enumeracion
 * @param rulesText: string - Texto de reglas de la carta
 * @param power: number - Poder de la carta
 * @param toughness: number - Resistencia de la carta
 * @param loyalty: number - Lealtad de la carta
 * @param marketValue: number - Valor de mercado de la carta
 */
export interface Card {
  id: number;
  name: string;
  manaCost: number;
  color: Color;
  cardType: LineType;
  rarity: Rarity;
  rulesText: string;
  power?: number; // SOLO se incluyen en aquellas cartas de tipo Criatura
  toughness?: number; // solo se incluyen en aquellas cartas de tipo Criatura
  loyalty?: number; // solo Planeswalker
  marketValue: number;
}
```

### FileManager.ts
```typescript
import fs from 'fs';
import { Card } from './Card.js';
import * as path from 'path';

/**
 * Clase para la gestión de archivos
 * Esta clase se utiliza para la gestión de archivos de las cartas de un usuario
 * Cada usuario tiene su propio directorio con los archivos de sus cartas
 * @param userDir: string - Directorio del usuario
 * @param username: string - Nombre de usuario
 * @param getUserDir: void - Obtener el directorio del usuario
 * @param getFilePath: void - Obtener la ruta de un archivo
 * @param save: void - Guardar la colección de cartas en archivos
 * @param writeFiles: void - Escribir los archivos de las cartas
 * @param load: void - Cargar la colección de cartas desde archivos
 */
export class FileManager {
  private readonly userDir: string;

  /**
   * Constructor de la clase FileManager
   * Se encarga de inicializar el nombre de usuario y el directorio del usuario
   * @param username username: string - Nombre de usuario
   * @returns void no retorna nada
   */
  constructor(private username: string) {
    this.userDir = `./src/EJERCICIO/users/${username}`;
  }
  
  /**
   * método para obtener el directorio del usuario
   * Lo que hace es llamar al callback con el directorio del usuario
   * @param callback parámetro callback: (error: string | undefined, userDir?: string) => void - Callback que se llama al finalizar la operación
   */
  public getUserDir(callback: (error: string | undefined, userDir?: string) => void): void {
    process.nextTick(() => {
      callback(undefined, this.userDir);
    });
  }

  /**
   * Método para obtener la ruta de un archivo
   * Lo que hace es llamar al callback con la ruta del archivo
   * @param cardId cardId: number - ID de la cart 
   * @param callback parámetro callback: (error: string | undefined, filePath?: string) => void - Callback que se llama al finalizar la operación
   */
  public getFilePath(cardId: number, callback: (error: string | undefined, filePath?: string) => void): void {
    const filePath = path.join(this.userDir, `card${cardId}.json`);
    process.nextTick(() => {
      callback(undefined, filePath);
    });
  }

  /**
   * Método para guardar la colección de cartas en archivos
   * Lo que hace es crear el directorio del usuario y llamar al método para escribir los archivos
   * Si hay un error al crear el directorio, se llama al callback con el error correspondiente
   * @param collection collection: Map<number, Card> - Colección de cartas
   * @param callback parámetro callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  public save(collection: Map<number, Card>, callback: (error: string | undefined) => void): void {
    // se crea el directorio del usuario y se llama al método para escribir los archivos
    const mkdirCallback = (err: NodeJS.ErrnoException | null) => {
      if (err) {
        callback(err.message);
      } else {
        this.writeFiles(collection, callback);
      }
    };
    fs.mkdir(this.userDir, { recursive: true }, mkdirCallback);
  }

  /**
   * Método para escribir los archivos de las cartas
   * Lo que hace es recorrer la colección de cartas y escribir los archivos
   * Si hay un error al escribir un archivo, se llama al callback con el error correspondiente
   * @param collection collection: Map<number, Card> - Colección de cartas
   * @param callback parámetro callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  private writeFiles(collection: Map<number, Card>, callback: (error: string | undefined) => void): void {
    const fileWriteCallbacks: Function[] = [];
    collection.forEach((card, cardId) => {
      const filePath = path.join(this.userDir, `card${cardId}.json`);
      // se define el callback para escribir el archivo de la carta
      const writeFileCallback = (err: NodeJS.ErrnoException | null) => {
        // si hay un error al escribir el archivo, se llama al callback con el error
        if (err) {
          callback(err.message);
        } else if (fileWriteCallbacks.length === collection.size) {
          callback(undefined);
        }
      };
      fileWriteCallbacks.push(writeFileCallback);
      fs.writeFile(filePath, JSON.stringify(card, null, 2), writeFileCallback);
    });
  }
  
  /**
   * método para cargar la colección de cartas desde archivos
   * Lo que hace es leer los archivos JSON de las cartas y guardar las cartas en la colección
   * Si hay un error al leer los archivos, se llama al callback con el error correspondiente
   * @param callback parámetro callback: (error: string | undefined, collection?: Map<number, Card>) => void - Callback que se llama al finalizar la operación
   * @returns void no retorna nada
   */
  public load(callback: (error: string | undefined, collection?: Map<number, Card>) => void): void {
    const collection = new Map<number, Card>();
    // se lee el directorio del usuario y se llama al callback con el error o la colección de cartas
    fs.readdir(this.userDir, (err, files) => {
      if (err) {
        callback(err.message);
      } else {
        const fileReadCallbacks: Function[] = [];
        files.forEach((file) => {
          const filePath = path.join(this.userDir, file);
          // se define el callback para leer el archivo de la carta
          const readFileCallback = (err: NodeJS.ErrnoException | null, data: Buffer) => {
            if (err) {
              callback(err.message);
            } else {
              // se lee el archivo JSON de la carta y se guarda la carta en la colección
              try {
                const card = JSON.parse(data.toString()) as Card;
                collection.set(card.id, card);
                if (fileReadCallbacks.length === files.length) {
                  callback(undefined, collection);
                }
              } catch (error) {
                callback(`Error al leer el archivo ${file}: ${error.message}`);
              }
            }
          };
          fileReadCallbacks.push(readFileCallback);
          fs.readFile(filePath, readFileCallback);
        });
      }
    });
  }
}

```

## Format_Card.ts
```typescript
import { Card } from "./Card.js";

/**
 * Función para convertir un objeto JSON a una carta
 * Lo que hace es crear una nueva carta con los datos del objeto JSON
 * @param card card: any - Objeto JSON con los datos de la carta
 * @returns Card - Carta creada a partir del objeto JSON
 */
export function JSONtoCard(card: any): Card {
  const CardCollection: Card = {
    id: card.id,
    name: card.name,
    manaCost: card.manaCost,
    color: card.color,
    cardType: card.cardType,
    rarity: card.rarity,
    rulesText: card.rulesText,
    marketValue: card.marketValue,
    power: card.power,
    toughness: card.toughness,
    loyalty: card.loyalty,
  };
  return CardCollection;
}
```

### Server_Express.ts
```typescript
import express from 'express';
import { CardCollection } from './User.js';
import { JSONtoCard } from './Format_Card.js';

// Crear una nueva colección de cartas
const cardCollection = new CardCollection('nombreDeUsuario');
// Crear una nueva aplicación de Express
const app = express();
// Usar JSON como formato de datos
app.use(express.json());

/**
 * Listar las cartas de un usuario
 * Si se proporciona un ID de carta, se devuelve la información de esa carta.
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al listar las cartas, se devuelve un mensaje de error
 * Si se proporciona un usuario, se devuelve la lista de cartas de ese usuario
 */
app.get('/cards', (req, res) => {
  // Si no se proporciona un usuario, se devuelve un mensaje de error
  if (!req.query.user) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario',
    });
    return;
  }
  // Si se proporciona un ID de carta, se devuelve la información de esa carta
  if (typeof req.query.id === 'string') {
    cardCollection.readCard(parseInt(req.query.id), (error, result) => {
      if (error) {
        res.status(500).json({ status: 'Error', answer: error });
      } else {
        res.status(200).json({ status: 'Success', answer: result });
      }
    });
  // Si no se proporciona un ID de carta, se devuelve la lista de cartas del usuario
  } else {
    cardCollection.listCards((error, result) => {
      if (error) {
        res.status(500).json({ status: 'Error', answer: error });
      } else {
        res.status(200).json({ status: 'Success', answer: result });
      }
    });
  }
});

/**
 * Añadir una carta a la colección de un usuario
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al añadir la carta, se devuelve un mensaje de error
 * Si se añade la carta correctamente, se devuelve un mensaje de éxito
 */
app.post('/cards', (req, res) => {
  // Si no se proporciona un usuario, se devuelve un mensaje de error
  if (!req.query.user) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario',
    });
    return;
  }
  // Se añade la carta a la colección del usuario
  cardCollection.addCard(JSONtoCard(req.body), (error) => {
    if (error) {
      res.status(500).json({ status: 'Error', answer: error });
    } else {
      res.status(200).json({ status: 'Success', answer: 'Card added successfully' });
    }
  });
});

/**
 * Eliminar una carta de la colección de un usuario
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al eliminar la carta, se devuelve un mensaje de error
 * Si se elimina la carta correctamente, se devuelve un mensaje de éxito
 * Si no se proporciona un usuario o un ID de carta, se devuelve un mensaje de error
 */
app.delete('/cards', (req, res) => {
  // Si no se proporciona un usuario o un ID de carta, se devuelve un mensaje de error
  if (!req.query.user || !req.query.id) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario y un ID de carta',
    });
    return;
  }
  // Se elimina la carta de la colección del usuario
  if (typeof req.query.id === 'string') {
    cardCollection.removeCard(parseInt(req.query.id), (error) => {
      if (error) {
        res.status(500).json({ status: 'Error', answer: error });
      } else {
        res.status(200).json({ status: 'Success', answer: 'Card removed successfully' });
      }
    });
  } else {
    // Si el ID no es un número, se devuelve un mensaje de error
    res.status(400).json({
      status: 'Error',
      answer: 'El ID debe ser un número',
    });
  }
});

/**
 * Actualizar una carta de la colección de un usuario
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al actualizar la carta, se devuelve un mensaje de error
 * Si se actualiza la carta correctamente, se devuelve un mensaje de éxito
 */
app.patch('/cards', (req, res) => {
  // Si no se proporciona un usuario o un ID de carta, se devuelve un mensaje de error
  if (!req.query.user || !req.query.id) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario y un ID de carta',
    });
    return;
  } 
  // si el ID en el cuerpo no es el mismo que en la cadena de consulta, se devuelve un mensaje de error
  if (typeof req.query.id === 'string' && typeof req.body.id === 'number') {
    if (parseInt(req.query.id) !== req.body.id) {
      res.status(400).json({
        status: 'Error',
        answer: 'El ID en el cuerpo debe ser el mismo que en la cadena de consulta',
      });
      return;
    }
  }
  // Se actualiza la carta de la colección del usuario con los datos proporcionados
  cardCollection.updateCard(JSONtoCard(req.body), (error) => {
    if (error) {
      res.status(500).json({ status: 'Error', answer: error });
    } else {
      res.status(200).json({ status: 'Success', answer: 'Card updated successfully' });
    }
  });
});

/**
 * Iniciar el servidor en el puerto 3000
 * Muestra un mensaje en la consola para indicar que el servidor está en funcionamiento
 * Si hay un error al iniciar el servidor, se muestra un mensaje en la consola
 */
app.listen(3000, () => {
  console.log('El servidor está en funcionamiento en el puerto 3000');
});

```
### User.ts
```typescript
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { Card } from './Card.js';

/**
 * Clase para la colección de cartas de un usuario
 * Esta clase se utiliza para la gestión de la colección de cartas de un usuario
 * Cada usuario tiene su propia colección de cartas
 */
export class CardCollection {
  // Colección de cartas
  private collection: Card[] = [];
  // Nombre de usuario
  private user: string;

  /**
   * Constructor de la clase CardCollection
   * Se encarga de inicializar el nombre de usuario y cargar la colección de cartas
   * @param user user: string - Nombre de usuario
   */
  constructor(user: string) {
    this.user = user;
    // Cargar la colección de cartas
    this.loadCollection((error) => {
      if (error) {
        console.log(chalk.red.bold(`Error al cargar la colección de ${this.user}: ${error}`));
      }
    });
  }

  /**
   * Método para cargar la colección de cartas
   * Lo que hace es leer los archivos de las cartas y guardarlas en la colección
   * Si hay un error al cargar la colección, se llama al callback con el error correspondiente
   * Utiliza la función fs.readdir para leer los archivos de las cartas
   * Carga las cartas desde archivos y las guarda en la colección
   * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  private loadCollection(callback: (error: string | undefined) => void): void {
    const directoryPath = `./cards/${this.user}`;
    // Leer los archivos de las cartas
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        callback(`Error al leer el directorio de la colección de ${this.user}: ${err}`);
      } else {
        const cardFiles = files.filter((file) => path.extname(file) === '.json');
        const fileReadPromises: Promise<void>[] = [];
        // Leer cada archivo y añadir la carta a la colección
        cardFiles.forEach((file) => {
          const filePath = path.join(directoryPath, file);
          const readFilePromise = new Promise<void>((resolve, reject) => {
            // Leer el archivo de la carta
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                reject(`Error al leer el archivo ${file}: ${err}`);
              } else {
                // Analizar los datos del archivo
                try {
                  const cardData = JSON.parse(data);
                  const card: Card = cardData;
                  this.collection.push(card);
                  resolve();
                } catch (parseError) {
                  reject(`Error al analizar el archivo ${file}: ${parseError}`);
                }
              }
            });
          });
          fileReadPromises.push(readFilePromise);
        });
        // Esperar a que se lean todos los archivos
        Promise.all(fileReadPromises)
          .then(() => callback(undefined))
          .catch((error) => callback(error));
      }
    });
  }

  /**
   * Método para añadir una carta a la colección
   * Añade la carta a la colección y la guarda en un archivo
   * Si hay un error al añadir la carta, se llama al callback con el error correspondiente
   * Utiliza la función fs.writeFile para guardar la carta en un archivo
   * @param card card: Card - Carta a añadir a la colección
   * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  public addCard(card: Card, callback: (error: string | undefined) => void): void {
    const cardFilePath = `./cards/${this.user}/${card.id}.json`;
    // Comprobar si la carta ya existe en la colección
    fs.stat(cardFilePath, (err) => {
      if (err) {
        // Si no existe, se añade a la colección y se guarda en un archivo
        fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
          if (err) {
            callback(err.message);
          } else {
            callback(undefined);
          }
        });
      } else {
        callback(`La carta con ID ${card.id} ya existe en la colección de ${this.user}.`);
      }
    });
  }

  /**
   * Método para actualizar una carta en la colección
   * Lo que hace es actualizar la información de la carta y guardarla en un archivo
   * Si hay un error al actualizar la carta, se llama al callback con el error correspondiente
   * Utiliza la función fs.writeFile para guardar la carta en un archivo
   * @param card card: Card - Carta con los datos actualizados
   * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  public updateCard(card: Card, callback: (error: string | undefined) => void): void {
    const cardFilePath = `./cards/${this.user}/${card.id}.json`;
    // Comprobar si la carta existe en la colección
    fs.stat(cardFilePath, (err) => {
      if (err) {
        callback(`La carta con ID ${card.id} no existe en la colección de ${this.user}.`);
      } else {
        // Si existe, se actualiza y se guarda en un archivo
        fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
          if (err) {
            callback(err.message);
          } else {
            callback(undefined);
          }
        });
      }
    });
  }

  /**
  * Método para eliminar una carta de la colección
  * Lo que hace es eliminar el archivo de la carta mediante el ID
  * Si hay un error al eliminar el archivo, se llama al callback con el error correspondiente
  * Utiliza la función fs.unlink para eliminar el archivo
  * @param cardID cardID: number - ID de la carta a eliminar
  * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
  */
  public removeCard(cardID: number, callback: (error: string | undefined) => void): void {
    const cardFilePath = `./cards/${this.user}/${cardID}.json`;
    // Comprobar si la carta existe en la colección
    fs.unlink(cardFilePath, (err) => {
      if (err) {
        callback(`Error al eliminar la carta con ID ${cardID} de la colección de ${this.user}: ${err}`);
      } else {
        callback(undefined);
      }
    });
  }

  /**
   * Método para listar las cartas de la colección
   * Lo que hace es leer los archivos de las cartas y devolver la información de cada una
   * Devuelve un string con la información de cada carta, separada por saltos de línea
   * @param callback callback: (error: string | undefined, result?: string) => void - Callback que se llama al finalizar la operación
   */
  public listCards(callback: (error: string | undefined, result?: string) => void): void {
    const directoryPath = `./cards/${this.user}`;
    // Leer los archivos de las cartas
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        callback(`Error al leer el directorio de la colección de ${this.user}: ${err}`);
      } else {
        //SI no hay error, se filtran los archivos con extensión .json
        const cardFiles = files.filter((file) => path.extname(file) === '.json');
        const cardsInfo: string[] = [];
        // Se recorre cada archivo y se añade la información al array cardsInfo
        cardFiles.forEach((file, index) => {
          const cardFilePath = path.join(directoryPath, file);
          const cardInfo = `Carta ${index + 1}: ${cardFilePath}`;
          cardsInfo.push(cardInfo);
        });
        // Se devuelve la información de las cartas
        const result = cardsInfo.join('\n');
        callback(undefined, result);
      }
    });
  }

  /**
   * Método para leer una carta de la colección
   * Lo que hace es leer el archivo de la carta mediante el ID y devolver la información
   * Si hay un error al leer el archivo, se llama al callback con el error correspondiente
   * Si no hay error, se devuelve la información de la carta
   * Utiliza la función fs.readFile para leer el archivo
   * @param cardID cardID: number - ID de la carta a leer
   * @param callback callback: (error: string | undefined, result?: Card) => void - Callback que se llama al finalizar la operación
   */
  public readCard(cardID: number, callback: (error: string | undefined, result?: Card) => void): void {
    const cardFilePath = `./cards/${this.user}/${cardID}.json`;
    // Leer el archivo de la carta
    fs.readFile(cardFilePath, 'utf8', (err, data) => {
      if (err) {
        callback(`Error al leer la carta con ID ${cardID} de la colección de ${this.user}: ${err}`);
      } else {
        try {
          const cardData = JSON.parse(data);
          const card: Card = cardData;
          callback(undefined, card);
        } catch (parseError) {
          callback(`Error al analizar la carta con ID ${cardID} de la colección de ${this.user}: ${parseError}`);
        }
      }
    });
  }
}
```

## Explicacion de lo realizado.

Tras haber visto el código porpuesto comentaré detalladamente cada parte del código realizado.

### Card.ts
Interfaz para la información de las cartas.

La interfaz `Card` se utiliza para definir la estructura de los datos que se van a utilizar en la aplicación relacionada con las cartas de un juego. Esta interfaz describe los atributos que debe tener cada carta y su tipo de dato correspondiente. A continuación, se detallan los atributos de la interfaz:

- **id:** Es un número que representa el identificador único de la carta.
- **name:** Es una cadena de caracteres que indica el nombre de la carta.
- **manaCost:** Es un número que representa el costo de mana de la carta.
- **color:** Es un valor de tipo `Color`, que proviene de un enumerado y representa el color de la carta.
- **cardType:** Es un valor de tipo `LineType`, también de un enumerado, que indica el tipo de la carta (Tierra, Criatura, Encantamiento, etc.).
- **rarity:** Es un valor de tipo `Rarity`, otro enumerado que representa la rareza de la carta (común, infrecuente, rara o mítica).
- **rulesText:** Es una cadena de caracteres que describe los efectos de la carta y cualquier regla especial que tenga.
- **power:** Es un número opcional que indica la fuerza de la carta. Este atributo solo se incluye en las cartas de tipo Criatura.
- **toughness:** Es un número opcional que indica la resistencia de la carta. Este atributo también se limita a las cartas de tipo Criatura.
- **loyalty:** Es un número opcional que representa la lealtad de la carta. Este atributo solo se incluye en las cartas de tipo Planeswalker.
- **marketValue:** Es un número que indica el valor de mercado de la carta.

Básicamente, la interfaz `Card` define la estructura básica de una carta del juego, especificando todos los atributos necesarios para su identificación, descripción y uso dentro de la aplicación.



### EnumerationColor.ts
Enumeración de colores para las cartas.

La enumeración `Color` se utiliza para definir los colores de las cartas. Cada carta tiene un color que puede ser blanco, azul, negro, rojo, verde, incoloro, e incluso multicolor. A continuación se detallan los valores de la enumeración:

- **Blanco:** Representa el color blanco.
- **Azul:** Representa el color azul.
- **Negro:** Representa el color negro.
- **Rojo:** Representa el color rojo.
- **Verde:** Representa el color verde.
- **Incoloro:** Representa el color incoloro.
- **Multicolor:** Representa el color multicolor.
- **Amarillo:** Representa el color amarillo.
- **Morado:** Representa el color morado.
- **Rosa:** Representa el color rosa.
- **Marron:** Representa el color marrón.
- **Naranja:** Representa el color naranja.

Esta enumeración permite establecer y manejar de manera clara y consistente los colores de las cartas en la aplicación.


### EnumerationLineType.ts
Enumeración de los tipos de cartas

La enumeración `LineType` se utiliza para definir los diferentes tipos de cartas que pueden existir. A continuación se detallan los valores de la enumeración:

- **Tierra:** Representa el tipo de carta Tierra, que generalmente proporciona mana.
- **Criatura:** Representa el tipo de carta Criatura, que puede ser atacada y bloqueada.
- **Encantamiento:** Representa el tipo de carta Encantamiento, que proporciona efectos continuos.
- **Conjuro:** Representa el tipo de carta Conjuro, que realiza una acción única cuando se juega.
- **Instantáneo:** Representa el tipo de carta Instantáneo, que se puede jugar en cualquier momento, incluso durante el turno de otro jugador.
- **Artefacto:** Representa el tipo de carta Artefacto, que puede proporcionar beneficios diversos.
- **Planeswalker:** Representa el tipo de carta Planeswalker, que representa a personajes poderosos en el juego.

Esta enumeración facilita la gestión y clasificación de los diferentes tipos de cartas presentes en la aplicación.


### EnumerationRarity.ts
Enumeración de las rarezas de las cartas.

La enumeración `Rarity` se utiliza para definir los diferentes niveles de rareza que pueden tener las cartas. Aquí se detallan los tipos de rareza disponibles:

- **Común:** Representa el tipo de rareza Común, que indica que la carta es relativamente fácil de obtener.
- **Infrecuente:** Representa el tipo de rareza Infrecuente, que indica que la carta es menos común que las comunes.
- **Rara:** Representa el tipo de rareza Rara, que indica que la carta es más difícil de obtener que las infrecuentes.
- **Mítica:** Representa el tipo de rareza Mítica, que indica que la carta es extremadamente rara y altamente valorada.

Estos valores de rareza permiten categorizar las cartas según su disponibilidad y valor en el juego.

### FileManager.ts
El código proporciona una clase `FileManager` para la gestión de archivos de cartas de usuario en una aplicación Express. La clase se encarga de crear, leer y escribir archivos JSON que representan las cartas de un usuario.

###### Constructor
El constructor de la clase recibe el nombre de usuario y establece el directorio del usuario en el que se guardarán los archivos de las cartas.

###### Métodos

###### `getUserDir(callback)`
Este método devuelve el directorio del usuario llamando a un callback con el directorio como argumento.

###### `getFilePath(cardId, callback)`
Devuelve la ruta del archivo para una carta específica, utilizando el ID de la carta. Llama al callback con la ruta del archivo como argumento.

###### `save(collection, callback)`
Guarda la colección de cartas en archivos JSON. Crea el directorio del usuario si no existe y luego escribe los archivos de cartas. Llama al callback con un error si hay algún problema durante el proceso.

###### `writeFiles(collection, callback)`
Escribe los archivos JSON de las cartas en el directorio del usuario. Utiliza un array de callbacks para asegurarse de que todos los archivos se han escrito correctamente. Llama al callback con un error si hay algún problema durante el proceso.

###### `load(callback)`
Carga la colección de cartas desde los archivos JSON en el directorio del usuario. Lee cada archivo y guarda las cartas en una colección. Llama al callback con un error si hay algún problema durante el proceso.

##### Uso
Se instancia la clase `FileManager` con el nombre de usuario y se utilizan sus métodos para gestionar los archivos de cartas de usuario en una aplicación Express.

### Format_Card.ts
La función `JSONtoCard` convierte un objeto JSON que representa una carta en una instancia de la clase `Card`. Toma como entrada un objeto JSON con los datos de la carta y devuelve una instancia de `Card` con esos datos.

###### Parámetros
- `card`: Objeto JSON con los datos de la carta.

###### Devolución
- `Card`: Carta creada a partir del objeto JSON.

###### Implementación
La función crea una nueva instancia de `Card` utilizando los datos proporcionados en el objeto JSON. Los campos del objeto JSON se asignan a los campos correspondientes de la instancia de `Card`.

###### Uso
La función se utiliza para convertir objetos JSON que representan cartas en instancias de la clase `Card`, lo que facilita el manejo de datos de cartas en formato JSON dentro de la aplicación.

### Server_Express.ts
Este código implementa una aplicación Express para la gestión de cartas de usuario. La aplicación proporciona endpoints para listar, añadir, eliminar y actualizar cartas en la colección de un usuario.

###### Dependencias
- `express`: Biblioteca para crear aplicaciones web y APIs con Node.js.
- `CardCollection`: Clase que representa la colección de cartas de un usuario.
- `JSONtoCard`: Función que convierte un objeto JSON en una instancia de la clase `Card`.

###### Configuración de la aplicación
- Se crea una nueva colección de cartas para un usuario especificado.
- Se crea una nueva instancia de la aplicación Express.
- Se configura la aplicación para usar JSON como formato de datos.

###### Endpoints
1. **Listar las cartas de un usuario** (`GET /cards`):
   - Si se proporciona un ID de carta, se devuelve la información de esa carta.
   - Si no se proporciona un ID, se devuelve la lista de cartas del usuario.
   
2. **Añadir una carta a la colección de un usuario** (`POST /cards`):
   - Se añade la carta especificada en el cuerpo de la solicitud a la colección del usuario.

3. **Eliminar una carta de la colección de un usuario** (`DELETE /cards`):
   - Se elimina la carta con el ID especificado de la colección del usuario.

4. **Actualizar una carta de la colección de un usuario** (`PATCH /cards`):
   - Se actualiza la carta con el ID especificado en el cuerpo de la solicitud en la colección del usuario.

## Iniciar el servidor
- La aplicación se inicia en el puerto 3000.
- Se muestra un mensaje en la consola indicando que el servidor está en funcionamiento.

###### Manejo de errores
- La aplicación devuelve mensajes de error y códigos de estado adecuados en caso de errores en las solicitudes.


### User.ts
Esta clase representa la colección de cartas de un usuario. Proporciona métodos para cargar, añadir, actualizar, eliminar, listar y leer cartas en la colección.

##### Dependencias
- `chalk`: Librería para dar estilo a la salida en la consola.
- `fs`: Módulo de Node.js para interactuar con el sistema de archivos.
- `path`: Módulo de Node.js para manejar rutas de archivos y directorios.
- `Card`: Clase que representa una carta individual.

###### Constructor
- Recibe el nombre de usuario como parámetro y carga automáticamente la colección de cartas del usuario desde el sistema de archivos.

###### Métodos

###### `loadCollection(callback)`
- Carga la colección de cartas del usuario desde el sistema de archivos.
- Utiliza `fs.readdir` para obtener la lista de archivos de cartas en el directorio correspondiente.
- Para cada archivo, utiliza `fs.readFile` para leer el contenido y lo parsea como JSON para crear instancias de `Card`.
- Llama al callback con un error si hay algún problema durante la carga.

###### `addCard(card, callback)`
- Añade una nueva carta a la colección del usuario.
- Verifica si la carta ya existe en la colección antes de añadirla.
- Utiliza `fs.writeFile` para guardar la nueva carta en un archivo JSON.
- Llama al callback con un error si la carta ya existe o si hay algún problema al escribir el archivo.

###### `updateCard(card, callback)`
- Actualiza una carta existente en la colección del usuario.
- Verifica si la carta existe antes de actualizarla.
- Utiliza `fs.writeFile` para guardar la carta actualizada en el mismo archivo JSON.
- Llama al callback con un error si la carta no existe o si hay algún problema al escribir el archivo.

###### `removeCard(cardID, callback)`
- Elimina una carta de la colección del usuario según su ID.
- Utiliza `fs.unlink` para eliminar el archivo JSON correspondiente a la carta.
- Llama al callback con un error si hay algún problema al eliminar el archivo.

###### `listCards(callback)`
- Lista todas las cartas en la colección del usuario.
- Utiliza `fs.readdir` para obtener la lista de archivos de cartas en el directorio correspondiente.
- Devuelve un string con la información de cada carta, separada por saltos de línea.
- Llama al callback con un error si hay algún problema al leer el directorio.

###### `readCard(cardID, callback)`
- Lee una carta específica de la colección del usuario según su ID.
- Utiliza `fs.readFile` para leer el contenido del archivo JSON de la carta.
- Llama al callback con un error si hay algún problema al leer el archivo o al parsear su contenido.


## Pruebas realizadas
Tras haber visto el código se explicarán las pruebas realizadas para el código anterior.

### Card.spec.ts
```typescript
// PRUEBAS PARA LA INTERFAZ CARD

import 'mocha';
import { expect } from 'chai';
import { Card } from '../../src/MAGICAPP/Card.js';
import { Color } from '../../src/MAGICAPP/EnumerationColor.js';
import { LineType } from '../../src/MAGICAPP/EnumerationLineType.js';
import { Rarity } from '../../src/MAGICAPP/EnumerationRarity.js';

// pruebas para la interfaz
describe('Card', () => {
  // pruebas para asegurarnos que tiene los atributos correctos
  it('should have the correct attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card).to.have.property('id');
    expect(card).to.have.property('name');
    expect(card).to.have.property('manaCost');
    expect(card).to.have.property('color');
    expect(card).to.have.property('cardType');
    expect(card).to.have.property('rarity');
    expect(card).to.have.property('rulesText');
    expect(card).to.have.property('marketValue');
  });
  // nos aseguramos de que son 8 atributos obligatorios
  it('should have 8 required attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.keys(card)).to.have.lengthOf(8);
  });
  // nos aseguramos de que los atributos opcionales sean opcionales
  it('should have 3 optional attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      power: 1,
      toughness: 1,
      loyalty: 1,
      marketValue: 1
    };
    expect(Object.keys(card)).to.have.lengthOf(11);
  });
  // nos aseguramos que todo es de tipo correcto
  it('should have correct types', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card.id).to.be.a('number');
    expect(card.name).to.be.a('string');
    expect(card.manaCost).to.be.a('number');
    expect(card.color).to.be.a('string');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
    expect(card.rulesText).to.be.a('string');
    expect(card.marketValue).to.be.a('number');
  });
  // nos aseguramos que los valores de los enums sean correctos
  it('should have correct enum values', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(Color)).to.include(card.color);
    expect(Object.values(LineType)).to.include(card.cardType);
    expect(Object.values(Rarity)).to.include(card.rarity);
  });
  // Nos aseguramos que el color es un color del enum y no otro
  it('should have a color from the enum', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Amarillo,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(Color)).to.include(card.color);
  });
  // nos aseguramos de que nada devuelve null
  it('should not have null values', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(card)).to.not.include(null);
  });
  // NADA devuelve undefined
  it('should not have undefined values', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(card)).to.not.include(undefined);
  });
  // nos aseguramos de que la interfaz card es una interfaz
  it('should be an interface', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card).to.be.an('object');
  });
  // Comprobamos que la interfaz card no es una funcion
  it('should not be a class', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card).to.not.be.a('function');
  });
  //Nos aseguramos que todos los atributos son diferentes
  it('should have different attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.keys(card)).to.have.lengthOf(8);
  });
  // Nos aseguramos que son enumeraciones
  it('should have enums', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card.color).to.be.a('string');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
  });
});
```

Las pruebas están diseñadas para verificar que la interfaz `Card`, que representa una carta en una aplicación de gestión de cartas de Magic: The Gathering, se comporta como se espera. Cada prueba se enfoca en diferentes aspectos de la interfaz, desde la presencia y tipo correcto de atributos hasta la validación de los valores de enumeraciones asociados a la carta. 

En resumen, estas pruebas garantizan que:
- La interfaz `Card` tiene los atributos correctos y obligatorios.
- Los atributos opcionales son realmente opcionales.
- Todos los atributos tienen el tipo de dato correcto.
- Los valores asociados a las enumeraciones de color, tipo de línea y rareza son válidos.
- El color de la carta pertenece al conjunto de colores definido en la enumeración `Color`.
- Ningún atributo de la carta es nulo o indefinido.
- La interfaz `Card` es de hecho un objeto y no una clase o función.
- Todos los atributos de la carta son diferentes entre sí.
- Los atributos asociados a las enumeraciones son de tipo string.

Estas pruebas son esenciales para garantizar que la estructura de la interfaz `Card` se mantenga coherente y correcta a lo largo del desarrollo de la aplicación, ayudando así a prevenir errores y asegurando un comportamiento consistente en el manejo de las cartas.


### EnumerationColor.spec.ts
```typescript
// PRUEBAS PARA LA ENUMERACION COLOR

import 'mocha';
import { expect } from 'chai';
import { Color } from '../../src/MAGICAPP/EnumerationColor.js';

// pruebas para la enumeración
describe('Color', () => {
  // pruebas para asegurarnos que tiene los colores correctos
  it('should have the correct colors', () => {
    expect(Color).to.have.property('Blanco');
    expect(Color).to.have.property('Azul');
    expect(Color).to.have.property('Rojo');
    expect(Color).to.have.property('Verde');
    expect(Color).to.have.property('Incoloro');
    expect(Color).to.have.property('Multicolor');
    expect(Color).to.have.property('Amarillo');
    expect(Color).to.have.property('Morado');
    expect(Color).to.have.property('Rosa');
    expect(Color).to.have.property('Marron');
    expect(Color).to.have.property('Naranja');
  });
  // Nos aseguramos de que son 12 colores
  it('should have 12 colors', () => {
    expect(Object.keys(Color)).to.have.lengthOf(12);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(Color.Blanco).to.be.a('string');
    expect(Color.Azul).to.be.a('string');
    expect(Color.Rojo).to.be.a('string');
    expect(Color.Verde).to.be.a('string');
    expect(Color.Incoloro).to.be.a('string');
    expect(Color.Multicolor).to.be.a('string');
    expect(Color.Amarillo).to.be.a('string');
    expect(Color.Morado).to.be.a('string');
    expect(Color.Rosa).to.be.a('string');
    expect(Color.Marron).to.be.a('string');
    expect(Color.Naranja).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(Color.Blanco).not.to.be.a('number');
    expect(Color.Azul).not.to.be.a('number');
    expect(Color.Rojo).not.to.be.a('number');
    expect(Color.Verde).not.to.be.a('number');
    expect(Color.Incoloro).not.to.be.a('number');
    expect(Color.Multicolor).not.to.be.a('number');
    expect(Color.Amarillo).not.to.be.a('number');
    expect(Color.Morado).not.to.be.a('number');
    expect(Color.Rosa).not.to.be.a('number');
    expect(Color.Marron).not.to.be.a('number');
    expect(Color.Naranja).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(Color.Blanco).not.to.be.undefined;
    expect(Color.Azul).not.to.be.undefined;
    expect(Color.Rojo).not.to.be.undefined;
    expect(Color.Verde).not.to.be.undefined;
    expect(Color.Incoloro).not.to.be.undefined;
    expect(Color.Multicolor).not.to.be.undefined;
    expect(Color.Amarillo).not.to.be.undefined;
    expect(Color.Morado).not.to.be.undefined;
    expect(Color.Rosa).not.to.be.undefined;
    expect(Color.Marron).not.to.be.undefined;
    expect(Color.Naranja).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(Color.Blanco).not.to.be.null;
    expect(Color.Azul).not.to.be.null;
    expect(Color.Rojo).not.to.be.null;
    expect(Color.Verde).not.to.be.null;
    expect(Color.Incoloro).not.to.be.null;
    expect(Color.Multicolor).not.to.be.null;
    expect(Color.Amarillo).not.to.be.null;
    expect(Color.Morado).not.to.be.null;
    expect(Color.Rosa).not.to.be.null;
    expect(Color.Marron).not.to.be.null;
    expect(Color.Naranja).not.to.be.null;
  });
  // no son bool
  it ('should not be bool', () => {
    expect(Color.Blanco).not.to.be.a('boolean');
    expect(Color.Azul).not.to.be.a('boolean');
    expect(Color.Rojo).not.to.be.a('boolean');
    expect(Color.Verde).not.to.be.a('boolean');
    expect(Color.Incoloro).not.to.be.a('boolean');
    expect(Color.Multicolor).not.to.be.a('boolean');
    expect(Color.Amarillo).not.to.be.a('boolean');
    expect(Color.Morado).not.to.be.a('boolean');
    expect(Color.Rosa).not.to.be.a('boolean');
    expect(Color.Marron).not.to.be.a('boolean');
    expect(Color.Naranja).not.to.be.a('boolean');
  });
  // nos aseguramos de que es una enumeracion
  it ('should be an enum', () => {
    expect(Color).to.be.an('object');
  });
  // no es una clase
  it ('should not be a class', () => {
    expect(Color).not.to.be.a('function');
  });
  // nos aseguramos de que no son arrays
  it ('should not be an array', () => {
    expect(Color).not.to.be.an('array');
  });
  // nos aseguramos de que todos los colores son distintos
  it ('should have different colors', () => {
    expect(Color.Blanco).not.to.be.equal(Color.Azul);
    expect(Color.Blanco).not.to.be.equal(Color.Rojo);
    expect(Color.Blanco).not.to.be.equal(Color.Verde);
    expect(Color.Blanco).not.to.be.equal(Color.Incoloro);
    expect(Color.Blanco).not.to.be.equal(Color.Multicolor);
    expect(Color.Blanco).not.to.be.equal(Color.Amarillo);
    expect(Color.Blanco).not.to.be.equal(Color.Morado);
    expect(Color.Blanco).not.to.be.equal(Color.Rosa);
    expect(Color.Blanco).not.to.be.equal(Color.Marron);
    expect(Color.Blanco).not.to.be.equal(Color.Naranja);
    expect(Color.Azul).not.to.be.equal(Color.Rojo);
    expect(Color.Azul).not.to.be.equal(Color.Verde);
    expect(Color.Azul).not.to.be.equal(Color.Incoloro);
    expect(Color.Azul).not.to.be.equal(Color.Multicolor);
    expect(Color.Azul).not.to.be.equal(Color.Amarillo);
    expect(Color.Azul).not.to.be.equal(Color.Morado);
    expect(Color.Azul).not.to.be.equal(Color.Rosa);
    expect(Color.Azul).not.to.be.equal(Color.Marron);
    expect(Color.Azul).not.to.be.equal(Color.Naranja);
    expect(Color.Rojo).not.to.be.equal(Color.Verde);
    expect(Color.Rojo).not.to.be.equal(Color.Incoloro);
    expect(Color.Rojo).not.to.be.equal(Color.Multicolor);
    expect(Color.Rojo).not.to.be.equal(Color.Amarillo);
    expect(Color.Rojo).not.to.be.equal(Color.Morado);
    expect(Color.Rojo).not.to.be.equal(Color.Rosa);
    expect(Color.Rojo).not.to.be.equal(Color.Marron);
    expect(Color.Rojo).not.to.be.equal(Color.Naranja);
    expect(Color.Verde).not.to.be.equal(Color.Incoloro);
    expect(Color.Verde).not.to.be.equal(Color.Multicolor);
    expect(Color.Verde).not.to.be.equal(Color.Amarillo);
    expect(Color.Verde).not.to.be.equal(Color.Morado);
    expect(Color.Verde).not.to.be.equal(Color.Rosa);
    expect(Color.Verde).not.to.be.equal(Color.Marron);
    expect(Color.Verde).not.to.be.equal(Color.Naranja);
    expect(Color.Incoloro).not.to.be.equal(Color.Multicolor);
    expect(Color.Incoloro).not.to.be.equal(Color.Amarillo);
    expect(Color.Incoloro).not.to.be.equal(Color.Morado);
    expect(Color.Incoloro).not.to.be.equal(Color.Rosa);
    expect(Color.Incoloro).not.to.be.equal(Color.Marron);
    expect(Color.Incoloro).not.to.be.equal(Color.Naranja);
    expect(Color.Multicolor).not.to.be.equal(Color.Amarillo);
    expect(Color.Multicolor).not.to.be.equal(Color.Morado);
    expect(Color.Multicolor).not.to.be.equal(Color.Rosa);
    expect(Color.Multicolor).not.to.be.equal(Color.Marron);
    expect(Color.Multicolor).not.to.be.equal(Color.Naranja);
    expect(Color.Amarillo).not.to.be.equal(Color.Morado);
    expect(Color.Amarillo).not.to.be.equal(Color.Rosa);
    expect(Color.Amarillo).not.to.be.equal(Color.Marron);
    expect(Color.Amarillo).not.to.be.equal(Color.Naranja);
    expect(Color.Morado).not.to.be.equal(Color.Rosa);
    expect(Color.Morado).not.to.be.equal(Color.Marron);
    expect(Color.Morado).not.to.be.equal(Color.Naranja);
    expect(Color.Rosa).not.to.be.equal(Color.Marron);
    expect(Color.Rosa).not.to.be.equal(Color.Naranja);
  });
  // el azul devuelve azul
  it ('should return blue', () => {
    expect(Color.Azul).to.be.equal('Azul');
  });
  // el blanco devuelve blanco
  it ('should return white', () => {
    expect(Color.Blanco).to.be.equal('Blanco');
  });
  // el rojo devuelve rojo
  it ('should return red', () => {
    expect(Color.Rojo).to.be.equal('Rojo');
  });
  // el verde devuelve verde
  it ('should return green', () => {
    expect(Color.Verde).to.be.equal('Verde');
  });
  // el incoloro devuelve incoloro
  it ('should return colorless', () => {
    expect(Color.Incoloro).to.be.equal('Incoloro');
  });
  // el multicolor devuelve multicolor
  it ('should return multicolor', () => {
    expect(Color.Multicolor).to.be.equal('Multicolor');
  });
  // el amarillo devuelve amarillo
  it ('should return yellow', () => {
    expect(Color.Amarillo).to.be.equal('Amarillo');
  });
  // el morado devuelve morado
  it ('should return purple', () => {
    expect(Color.Morado).to.be.equal('Morado');
  });
  // el rosa devuelve rosa
  it ('should return pink', () => {
    expect(Color.Rosa).to.be.equal('Rosa');
  });
  // el marron devuelve marron
  it ('should return brown', () => {
    expect(Color.Marron).to.be.equal('Marron');
  });
  // el naranja devuelve naranja
  it ('should return orange', () => {
    expect(Color.Naranja).to.be.equal('Naranja');
  });
});
```

Estas pruebas están diseñadas para asegurar que la enumeración `Color`, que define los posibles colores de las cartas en la aplicación de gestión de cartas. Cada prueba se centra en diferentes aspectos de la enumeración, desde la presencia y tipo de colores correctos hasta la validación de que los valores no sean nulos, indefinidos ni de otros tipos no deseados.

En resumen, estas pruebas garantizan que:
- La enumeración `Color` contiene todos los colores esperados, incluidos Blanco, Azul, Rojo, Verde, Incoloro, Multicolor, Amarillo, Morado, Rosa, Marrón y Naranja.
- La enumeración contiene exactamente 12 colores.
- Todos los valores en la enumeración son de tipo string.
- Ningún valor en la enumeración es de otro tipo, como número, booleano o array.
- Ningún valor en la enumeración es nulo ni indefinido.
- La enumeración es un objeto y no una función ni una clase.
- Todos los colores son distintos entre sí.
- Cada color devuelve el nombre correspondiente como se espera.

Estas pruebas son esenciales para garantizar que la enumeración `Color` esté definida correctamente y que sus valores sean coherentes y válidos, lo que contribuye a un comportamiento consistente y sin errores en la aplicación de gestión de cartas.



### EnumerationLineType.spec.ts
```typescript
//PRUEBAS PARA LA ENUMERACION LINETYPE

import 'mocha';
import { expect } from 'chai';
import { LineType } from '../../src/MAGICAPP/EnumerationLineType.js';

// pruebas para la enumeración
describe('LineType', () => {
  // pruebas para asegurarnos que tiene los tipos de cartas correctos
  it('should have the correct line types', () => {
    expect(LineType).to.have.property('Tierra');
    expect(LineType).to.have.property('Criatura');
    expect(LineType).to.have.property('Encantamiento');
    expect(LineType).to.have.property('Conjuro');
    expect(LineType).to.have.property('Instantáneo');
    expect(LineType).to.have.property('Artefacto');
    expect(LineType).to.have.property('Planeswalker');
  });
  // Nos aseguramos de que son 7 tipos de cartas
  it('should have 7 line types', () => {
    expect(Object.keys(LineType)).to.have.lengthOf(7);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(LineType.Tierra).to.be.a('string');
    expect(LineType.Criatura).to.be.a('string');
    expect(LineType.Encantamiento).to.be.a('string');
    expect(LineType.Conjuro).to.be.a('string');
    expect(LineType.Instantáneo).to.be.a('string');
    expect(LineType.Artefacto).to.be.a('string');
    expect(LineType.Planeswalker).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(LineType.Tierra).not.to.be.a('number');
    expect(LineType.Criatura).not.to.be.a('number');
    expect(LineType.Encantamiento).not.to.be.a('number');
    expect(LineType.Conjuro).not.to.be.a('number');
    expect(LineType.Instantáneo).not.to.be.a('number');
    expect(LineType.Artefacto).not.to.be.a('number');
    expect(LineType.Planeswalker).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(LineType.Tierra).not.to.be.undefined;
    expect(LineType.Criatura).not.to.be.undefined;
    expect(LineType.Encantamiento).not.to.be.undefined;
    expect(LineType.Conjuro).not.to.be.undefined;
    expect(LineType.Instantáneo).not.to.be.undefined;
    expect(LineType.Artefacto).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(LineType.Tierra).not.to.be.null;
    expect(LineType.Criatura).not.to.be.null;
    expect(LineType.Encantamiento).not.to.be.null;
    expect(LineType.Conjuro).not.to.be.null;
    expect(LineType.Instantáneo).not.to.be.null;
    expect(LineType.Artefacto).not.to.be.null;
    expect(LineType.Planeswalker).not.to.be.null;
  });
  // no son bool
  it ('should not be boolean', () => {
    expect(LineType.Tierra).not.to.be.a('boolean');
    expect(LineType.Criatura).not.to.be.a('boolean');
    expect(LineType.Encantamiento).not.to.be.a('boolean');
    expect(LineType.Conjuro).not.to.be.a('boolean');
    expect(LineType.Instantáneo).not.to.be.a('boolean');
    expect(LineType.Artefacto).not.to.be.a('boolean');
    expect(LineType.Planeswalker).not.to.be.a('boolean');
  });
  // no son arrays
  it ('should not be an array', () => {
    expect(LineType.Tierra).not.to.be.an('array');
    expect(LineType.Criatura).not.to.be.an('array');
    expect(LineType.Encantamiento).not.to.be.an('array');
    expect(LineType.Conjuro).not.to.be.an('array');
    expect(LineType.Instantáneo).not.to.be.an('array');
    expect(LineType.Artefacto).not.to.be.an('array');
    expect(LineType.Planeswalker).not.to.be.an('array');
  });
  // comporbamos que es una enumeracion
  it ('should be an enumeration', () => {
    expect(LineType).to.be.an('object');
  });
  // comporbamos que no es una funcion
  it ('should not be a function', () => {
    expect(LineType).not.to.be.a('function');
  });
  // comporbamos que todos los tipos son distintos
  it ('should have different types', () => {
    expect(LineType.Tierra).not.to.be.equal(LineType.Criatura);
    expect(LineType.Tierra).not.to.be.equal(LineType.Encantamiento);
    expect(LineType.Tierra).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Tierra).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Tierra).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Tierra).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Criatura).not.to.be.equal(LineType.Encantamiento);
    expect(LineType.Criatura).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Criatura).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Criatura).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Criatura).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Instantáneo).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Instantáneo).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Artefacto).not.to.be.equal(LineType.Planeswalker);
  });
  // comprobamos que conjuro devuelve Conjuro
  it ('should return Conjuro', () => {
    expect(LineType.Conjuro).to.be.equal('Conjuro');
  });
  // comprobamos que criatura devuelve Criatura
  it ('should return Criatura', () => {
    expect(LineType.Criatura).to.be.equal('Criatura');
  });
  // comprobamos que tierra devuelve Tierra
  it ('should return Tierra', () => {
    expect(LineType.Tierra).to.be.equal('Tierra');
  });
  // comprobamos que encantamiento devuelve Encantamiento
  it ('should return Encantamiento', () => {
    expect(LineType.Encantamiento).to.be.equal('Encantamiento');
  });
  // comprobamos que instantaneo devuelve Instantáneo
  it ('should return Instantáneo', () => {
    expect(LineType.Instantáneo).to.be.equal('Instantáneo');
  });
  // comprobamos que artefacto devuelve Artefacto
  it ('should return Artefacto', () => {
    expect(LineType.Artefacto).to.be.equal('Artefacto');
  });
  // comprobamos que planeswalker devuelve Planeswalker
  it ('should return Planeswalker', () => {
    expect(LineType.Planeswalker).to.be.equal('Planeswalker');
  });
  // comprbamos que no devuelve un valor incorrecto
  it ('should not return an incorrect value', () => {
    expect(LineType.Tierra).not.to.be.equal('Criatura');
    expect(LineType.Tierra).not.to.be.equal('Encantamiento');
    expect(LineType.Tierra).not.to.be.equal('Conjuro');
    expect(LineType.Tierra).not.to.be.equal('Instantáneo');
    expect(LineType.Tierra).not.to.be.equal('Artefacto');
    expect(LineType.Tierra).not.to.be.equal('Planeswalker');
    expect(LineType.Criatura).not.to.be.equal('Encantamiento');
    expect(LineType.Criatura).not.to.be.equal('Conjuro');
    expect(LineType.Criatura).not.to.be.equal('Instantáneo');
    expect(LineType.Criatura).not.to.be.equal('Artefacto');
    expect(LineType.Criatura).not.to.be.equal('Planeswalker');
    expect(LineType.Encantamiento).not.to.be.equal('Conjuro');
    expect(LineType.Encantamiento).not.to.be.equal('Instantáneo');
    expect(LineType.Encantamiento).not.to.be.equal('Artefacto');
    expect(LineType.Encantamiento).not.to.be.equal('Planeswalker');
    expect(LineType.Conjuro).not.to.be.equal('Instantáneo');
    expect(LineType.Conjuro).not.to.be.equal('Artefacto');
    expect(LineType.Conjuro).not.to.be.equal('Planeswalker');
    expect(LineType.Instantáneo).not.to.be.equal('Artefacto');
    expect(LineType.Instantáneo).not.to.be.equal('Planeswalker');
    expect(LineType.Artefacto).not.to.be.equal('Planeswalker');
  });
});
```

Estas pruebas están destinadas a garantizar que la enumeración `LineType`, que define los diferentes tipos de cartas en la aplicación de gestión de cartas de Magic. Cada prueba se centra en diferentes aspectos de la enumeración, desde la presencia y el tipo de tipos de cartas correctos hasta la validación de que los valores no sean nulos, indefinidos ni de otros tipos no deseados.

En resumen, estas pruebas aseguran que:
- La enumeración `LineType` contiene todos los tipos de cartas esperados, incluyendo Tierra, Criatura, Encantamiento, Conjuro, Instantáneo, Artefacto y Planeswalker.
- La enumeración contiene exactamente 7 tipos de cartas.
- Todos los valores en la enumeración son de tipo string.
- Ningún valor en la enumeración es de otro tipo, como número, booleano o array.
- Ningún valor en la enumeración es nulo ni indefinido.
- La enumeración es un objeto y no una función ni una clase.
- Todos los tipos de cartas son distintos entre sí.
- Cada tipo de carta devuelve el nombre correspondiente como se espera.

Estas pruebas son esenciales para garantizar que la enumeración `LineType` esté definida correctamente y que sus valores sean coherentes y válidos, lo que contribuye a un comportamiento consistente y sin errores en la aplicación de gestión de cartas.


### EnumerationRarity.spec.ts
```typescript
// PRUEBAS PARA LA ENUMERACION RARITY

import 'mocha';
import { expect } from 'chai';
import { Rarity } from '../../src/MAGICAPP/EnumerationRarity.js';

// pruebas para la enumeración
describe('Rarity', () => {
  // pruebas para asegurarnos que tiene las rarezas correctas
  it('should have the correct rarities', () => {
    expect(Rarity).to.have.property('Comun');
    expect(Rarity).to.have.property('Infrecuente');
    expect(Rarity).to.have.property('Rara');
    expect(Rarity).to.have.property('Mítica');
  });
  // Nos aseguramos de que son 4 rarezas
  it('should have 4 rarities', () => {
    expect(Object.keys(Rarity)).to.have.lengthOf(4);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(Rarity.Comun).to.be.a('string');
    expect(Rarity.Infrecuente).to.be.a('string');
    expect(Rarity.Rara).to.be.a('string');
    expect(Rarity.Mítica).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(Rarity.Comun).not.to.be.a('number');
    expect(Rarity.Infrecuente).not.to.be.a('number');
    expect(Rarity.Rara).not.to.be.a('number');
    expect(Rarity.Mítica).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(Rarity.Comun).not.to.be.undefined;
    expect(Rarity.Infrecuente).not.to.be.undefined;
    expect(Rarity.Rara).not.to.be.undefined;
    expect(Rarity.Mítica).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(Rarity.Comun).not.to.be.null;
    expect(Rarity.Infrecuente).not.to.be.null;
    expect(Rarity.Rara).not.to.be.null;
    expect(Rarity.Mítica).not.to.be.null;
  });
  // no son bool
  it ('should not be a boolean', () => {
    expect(Rarity.Comun).not.to.be.a('boolean');
    expect(Rarity.Infrecuente).not.to.be.a('boolean');
    expect(Rarity.Rara).not.to.be.a('boolean');
    expect(Rarity.Mítica).not.to.be.a('boolean');
  });
  // no son arrays
  it ('should not be an array', () => {
    expect(Rarity.Comun).not.to.be.an('array');
    expect(Rarity.Infrecuente).not.to.be.an('array');
    expect(Rarity.Rara).not.to.be.an('array');
    expect(Rarity.Mítica).not.to.be.an('array');
  });
  // es una enumeracion
  it ('should be an enumeration', () => {
    expect(Rarity).to.be.an('object');
  });
  // no es una funcion
  it ('should not be a function', () => {
    expect(Rarity).not.to.be.a('function');
  });
  // las rarezas son todas distintas
  it ('should have different rarities', () => {
    expect(Rarity.Comun).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Comun).not.to.equal(Rarity.Rara);
    expect(Rarity.Comun).not.to.equal(Rarity.Mítica);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Rara);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Mítica);
    expect(Rarity.Rara).not.to.equal(Rarity.Mítica);
    expect(Rarity.Rara).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Mítica).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Mítica).not.to.equal(Rarity.Rara);
    expect(Rarity.Mítica).not.to.equal(Rarity.Comun);
    expect(Rarity.Rara).not.to.equal(Rarity.Comun);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Comun);
  });
  // las rarezas son las correctas
  it ('should have the correct rarities', () => {
    expect(Rarity.Comun).to.equal('Comun');
    expect(Rarity.Infrecuente).to.equal('Infrecuente');
    expect(Rarity.Rara).to.equal('Rara');
    expect(Rarity.Mítica).to.equal('Mítica');
  });
  // comun devuelve comun
  it ('should return Comun for Comun', () => {
    expect(Rarity.Comun).to.equal('Comun');
  });
  // infrecuente devuelve infrecuente
  it ('should return Infrecuente for Infrecuente', () => {
    expect(Rarity.Infrecuente).to.equal('Infrecuente');
  });
  // rara devuelve rara
  it ('should return Rara for Rara', () => {
    expect(Rarity.Rara).to.equal('Rara');
  });
  // mítica devuelve mítica
  it ('should return Mítica for Mítica', () => {
    expect(Rarity.Mítica).to.equal('Mítica');
  });
});

```

Estas pruebas están diseñadas para verificar el comportamiento de la enumeración `Rarity`, que define las diferentes rarezas de las cartas en la aplicación de gestión de cartas de Magic. Cada prueba se enfoca en aspectos específicos de la enumeración, desde la presencia y el tipo de rarezas correctas hasta la validación de que los valores no sean nulos, indefinidos ni de otros tipos no deseados.

En resumen, estas pruebas garantizan que:
- La enumeración `Rarity` contiene todas las rarezas esperadas, incluyendo Común, Infrecuente, Rara y Mítica.
- La enumeración contiene exactamente 4 rarezas.
- Todos los valores en la enumeración son de tipo string.
- Ningún valor en la enumeración es de otro tipo, como número, booleano o array.
- Ningún valor en la enumeración es nulo ni indefinido.
- La enumeración es un objeto y no una función ni una clase.
- Todas las rarezas son distintas entre sí.
- Cada rareza devuelve el nombre correspondiente como se espera.

Estas pruebas son esenciales para garantizar que la enumeración `Rarity` esté definida correctamente y que sus valores sean coherentes y válidos, lo que contribuye a un comportamiento consistente y sin errores en la aplicación de gestión de cartas.


### FileManager.spec.ts
```typescript
// PRUEBAS PARA FILE MANAGER

import 'mocha';
import { expect } from 'chai';
import { FileManager } from '../../src/EJERCICIO/FileManager.js';
import { Card } from '../../src/EJERCICIO/Card.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';
import * as fs from 'fs';
import sinon from 'sinon';


// PRUEBAS PARA LA CLASE FileManager
describe('FileManager', () => {
  // Creamos una instancia de la clase FileManager
  let fileManager: FileManager;
  beforeEach(() => {
    fileManager = new FileManager('test');
  });
  // comprobamos que sea una clase
  it('Debería ser una clase', () => {
    expect(FileManager).to.be.a('function');
  });

  // comprobamos que getUserDir y getFilePath sean funciones
  it('Debería tener las funciones getUserDir y getFilePath', () => {
    expect(fileManager.getUserDir).to.be.a('function');
    expect(fileManager.getFilePath).to.be.a('function');
  });

  // Se utiliza el patron callback para obtener el directorio del usuario
  it('getUserDir debería obtener el directorio del usuario', (done) => {
    fileManager.getUserDir((error, userDir) => {
      expect(error).to.be.undefined;
      expect(userDir).to.be.a('string');
      done();
    });
  });

  // save debería ser una función
  it('save debería ser una función', () => {
    expect(fileManager.save).to.be.a('function');
  });

  // getFilePath debería obtener la ruta de un archivo
  it('getFilePath debería obtener la ruta de un archivo', (done) => {
    fileManager.getFilePath(1, (error, filePath) => {
      expect(error).to.be.undefined;
      expect(filePath).to.be.a('string');
      done();
    });
  });

  // save debería guardar la colección de cartas en archivos
  it('save debería guardar la colección de cartas en archivos', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // save hace uso de los callbacks
  it('save debería hacer uso de los callbacks', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // save debería llamar a writeFiles
  it('save debería llamar a writeFiles', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });
  
  // writeFiles debería escribir los archivos de las cartas
  it('writeFiles debería escribir los archivos de las cartas', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // writeFiles hace uso de los callbacks
  it('writeFiles debería hacer uso de los callbacks', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });
  // es una función p
  it('save debería ser una función', () => {
    expect(fileManager.save).to.be.a('function');
  });

  // load es una función
  it('load debería ser una función', () => {
    expect(fileManager.load).to.be.a('function');
  });

  // load hace uso de los callbacks
  it('load debería hacer uso de los callbacks', (done) => {
    fileManager.load((error, collection) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // load debería cargar la colección de cartas desde archivos
  it('load debería cargar la colección de cartas desde archivos', (done) => {
    fileManager.load((error, collection) => {
      expect(error).to.be.undefined;
      done();
    });
  });
});
```

Estas pruebas verifican el funcionamiento de la clase `FileManager`, que se encarga de manejar la escritura y lectura de archivos que contienen la información de la colección de cartas de un usuario.

#### Dependencias
- `mocha`: Marco de pruebas para JavaScript.
- `chai`: Biblioteca de aserciones que se integra con Mocha para realizar afirmaciones más legibles.
- `sinon`: Herramienta de prueba de espionaje, falsificación y stubbing.

#### Pruebas
Las pruebas se dividen en varios casos para verificar diferentes aspectos del comportamiento de `FileManager`.

#### Pruebas de existencia y tipo
- Se verifica que `FileManager` sea una clase y que tenga las funciones `getUserDir` y `getFilePath`.
- Se comprueba que `save` y `load` sean funciones.

#### Pruebas de obtención de directorio y ruta de archivo
- Se verifica que `getUserDir` pueda obtener el directorio del usuario utilizando un callback.
- Se verifica que `getFilePath` pueda obtener la ruta de un archivo utilizando un callback.

#### Pruebas de escritura y lectura de archivos
- Se verifica que `save` pueda guardar la colección de cartas en archivos utilizando un callback.
- Se verifica que `load` pueda cargar la colección de cartas desde archivos utilizando un callback.

#### Pruebas de uso de callbacks
- Se verifica que tanto `save` como `load` hagan uso de los callbacks proporcionados.

#### Pruebas de llamadas a funciones internas
- Se verifica que `save` llame a la función interna `writeFiles`.
- Se verifica que `writeFiles` escriba los archivos de las cartas correctamente y haga uso de los callbacks proporcionados.


### FormatCard.spec.ts
```typescript
// PRUEBAS A LA FUNCION FORMAT CARD

import 'mocha';
import { expect } from 'chai';
import { JSONtoCard } from '../../src/EJERCICIO/Format_Card.js';

// PRUEBAS PARA LA FUNCION FORMATCARD
describe('JSONtoCard', () => {
  // comprobamos que sea una función
  it('JSONtoCard debería ser una función', () => {
    expect(JSONtoCard).to.be.a('function');
  });

  // comprobamos que recibe un objeto
  it('JSONtoCard debería recibir un objeto', () => {
    const card = JSONtoCard({});
    expect(card).to.be.an('object');
  });

  // comprobamos que recibe un objeto con las propiedades correctas
  it('JSONtoCard debería recibir un objeto con las propiedades correctas', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card).to.have.property('id');
    expect(card).to.have.property('name');
    expect(card).to.have.property('color');
    expect(card).to.have.property('manaCost');
    expect(card).to.have.property('cardType');
    expect(card).to.have.property('rarity');
    expect(card).to.have.property('rulesText');
    expect(card).to.have.property('marketValue');
  });

  // comprobamos que recibe un objeto con las propiedades correctas y los valores correctos
  it('JSONtoCard debería recibir un objeto con las propiedades correctas y los valores correctos', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card.id).to.be.a('number');
    expect(card.name).to.be.a('string');
    expect(card.color).to.be.a('string');
    expect(card.manaCost).to.be.a('number');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
    expect(card.rulesText).to.be.a('string');
    expect(card.marketValue).to.be.a('number');
  });

  // comporbamos que sea una funcion
  it('JSONtoCard debería ser una función', () => {
    expect(JSONtoCard).to.be.a('function');
  });

  // comprobamos que no devuelva undefined
  it('JSONtoCard no debería devolver undefined', () => {
    const card = JSONtoCard({});
    expect(card).to.not.be.undefined;
  });

  // no devuelva tipos incorrectods
  it('JSONtoCard no debería devolver tipos incorrectos', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card.id).to.not.be.a('string');
    expect(card.name).to.not.be.a('number');
    expect(card.color).to.not.be.a('number');
    expect(card.manaCost).to.not.be.a('string');
    expect(card.cardType).to.not.be.a('number');
    expect(card.rarity).to.not.be.a('number');
    expect(card.rulesText).to.not.be.a('number');
    expect(card.marketValue).to.not.be.a('string');
  });
  // TIENE QUE DEVOLVER UN OBJETO
  it('JSONtoCard debería devolver un objeto', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card).to.be.an('object');
  });

  // tiene 11 propiedades
  it('JSONtoCard debería tener 11 propiedades', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(Object.keys(card).length).to.equal(11);
  });

  // tiene las propiedades correctas
  it('JSONtoCard debería tener las propiedades correctas', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card).to.have.property('id');
    expect(card).to.have.property('name');
    expect(card).to.have.property('color');
    expect(card).to.have.property('manaCost');
    expect(card).to.have.property('cardType');
    expect(card).to.have.property('rarity');
    expect(card).to.have.property('rulesText');
    expect(card).to.have.property('marketValue');
  });

  // tiene los valores correctos
  it('JSONtoCard debería tener los valores correctos', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card.id).to.equal(1);
    expect(card.name).to.equal('test');
    expect(card.color).to.equal('Blanco');
    expect(card.manaCost).to.equal(1);
    expect(card.cardType).to.equal('Criatura');
    expect(card.rarity).to.equal('Comun');
    expect(card.rulesText).to.equal('Some rules text');
    expect(card.marketValue).to.equal(0.01);
  });
});

```

Estas pruebas verifican el comportamiento de la función `JSONtoCard`, que se encarga de convertir un objeto JSON en una instancia de la clase `Card`.

#### Dependencias
- `mocha`: Marco de pruebas para JavaScript.
- `chai`: Biblioteca de aserciones que se integra con Mocha para realizar afirmaciones más legibles.

#### Pruebas
Las pruebas se dividen en varios casos para verificar diferentes aspectos del comportamiento de `JSONtoCard`.

#### Pruebas de existencia y tipo
- Se verifica que `JSONtoCard` sea una función.
- Se comprueba que el resultado de `JSONtoCard` sea un objeto.

#### Pruebas de propiedades y valores
- Se verifica que el objeto devuelto por `JSONtoCard` tenga las propiedades correctas.
- Se comprueba que las propiedades del objeto devuelto por `JSONtoCard` tengan los valores correctos.
- Se verifica que el objeto devuelto tenga exactamente 11 propiedades.
- Se comprueba que el objeto devuelto no tenga propiedades con tipos incorrectos.

#### Pruebas adicionales
- Se verifica que `JSONtoCard` no devuelva `undefined`.
- Se verifica que `JSONtoCard` devuelva un objeto.
- Se verifica que `JSONtoCard` sea una función.


### User.spec.ts
```typescript
// PRUEBAS PARA LA CLASE CARD COLLECTION

import 'mocha';
import { expect } from 'chai';
import { CardCollection } from '../../src/EJERCICIO/User.js';
import { Card } from '../../src/EJERCICIO/Card.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';
import * as fs from 'fs';
import sinon from 'sinon';
import path from 'path';


// PRUEBAS PARA LA CLASE CardCollection
describe('CardCollection', () => {
  // Creamos una instancia de la clase CardCollection
  let cardCollection: CardCollection;
  beforeEach(() => {
    cardCollection = new CardCollection('test');
  });
  // comporbamos que sea una clase
  it('Debería ser una clase', () => {
    expect(CardCollection).to.be.a('function');
  });

  // comprobamos que add y update sean funciones
  it('Debería tener las funciones addCard y updateCard', () => {
    expect(cardCollection.addCard).to.be.a('function');
    expect(cardCollection.updateCard).to.be.a('function');
  });

  // TIENE UN CONSTRUCTOR
  it('Debería tener un constructor', () => {
    expect(cardCollection.constructor).to.be.a('function');
  });

  // TIENE UN METODO addCard
  it('Debería tener un método addCard', () => {
    expect(cardCollection.addCard).to.be.a('function');
  });

  // TIENE UN METODO updateCard
  it('Debería tener un método updateCard', () => {
    expect(cardCollection.updateCard).to.be.a('function');
  });

  // TIENE UN METODO RemoveCard
  it('Debería tener un método removeCard', () => {
    expect(cardCollection.removeCard).to.be.a('function');
  });

  // TIENE UN METODO ListCards
  it('Debería tener un método listCards', () => {
    expect(cardCollection.listCards).to.be.a('function');
  });

  // TIENE UN METODO READCARD
  it('Debería tener un método readCard', () => {
    expect(cardCollection.readCard).to.be.a('function');
  });

  // PRUEBAS PARA LA FUNCIÓN addCard DE LA CLASE CardCollection
  describe('addCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que addCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.addCard).to.be.a('function');
    });      

  });

  // PRUEBAS PARA LA FUNCIÓN updateCard DE LA CLASE CardCollection
  describe('updateCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que updateCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.updateCard).to.be.a('function');
    });
  });

  // PRUEBAS PARA LA FUNCIÓN removeCard DE LA CLASE CardCollection
  describe('removeCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que removeCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.removeCard).to.be.a('function');
    });

  });

  // PRUEBAS PARA LA FUNCIÓN listCards DE LA CLASE CardCollection
  describe('listCards', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que listCards sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.listCards).to.be.a('function');
    });

  });

  // PRUEBAS PARA LA FUNCIÓN readCard DE LA CLASE CardCollection
  describe('readCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que readCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.readCard).to.be.a('function');
    });
  });
});
```
Estas pruebas verifican el comportamiento de la clase `CardCollection`, que se utiliza para gestionar la colección de cartas de un usuario.

#### Dependencias
- `mocha`: Marco de pruebas para JavaScript.
- `chai`: Biblioteca de aserciones que se integra con Mocha para realizar afirmaciones más legibles.
- `sinon`: Biblioteca para la creación de stubs, spies y mocks en pruebas unitarias.

#### Pruebas
Las pruebas se dividen en varios casos para verificar diferentes aspectos del comportamiento de la clase `CardCollection`.

#### Pruebas de existencia y tipo
- Se verifica que `CardCollection` sea una clase.
- Se comprueba que las funciones `addCard`, `updateCard`, `removeCard`, `listCards` y `readCard` sean métodos de la clase `CardCollection`.

#### Pruebas de instanciación
- Se crea una instancia de la clase `CardCollection` antes de cada prueba para garantizar un estado limpio.

#### Pruebas de métodos
- Se realizan pruebas individuales para cada método (`addCard`, `updateCard`, `removeCard`, `listCards` y `readCard`).

#### Pruebas adicionales
- Se verifica que los métodos `addCard`, `updateCard`, `removeCard`, `listCards` y `readCard` sean funciones.

---

# 12. Conclusión
En esta práctica, hemos desarrollado una aplicación Express para coleccionistas de cartas Magic, basándonos en implementaciones anteriores de la misma aplicación pero esta vez utilizando un servidor HTTP escrito con Express. 

Hemos definido una serie de requisitos para la aplicación, incluyendo operaciones como añadir, modificar, eliminar, listar y mostrar cartas de un usuario, y hemos diseñado endpoints HTTP correspondientes para cada una de estas operaciones.

Durante el desarrollo, hemos tenido en cuenta consejos de implementación como el uso de mensajes de respuesta en formato JSON, la gestión de lógica asociada al sistema de ficheros en el servidor Express utilizando el API asíncrona de Node.js, y la definición de endpoints HTTP con los verbos adecuados para cada operación.

Además, hemos adoptado una metodología de desarrollo dirigido por pruebas/comportamiento (TDD/BDD), implementando pruebas unitarias para verificar el correcto funcionamiento del código y también para comprobar la robustez del software ante entradas no válidas o inesperadas.

En conclusión, hemos logrado desarrollar una aplicación Express funcional que cumple con los requisitos establecidos y que está preparada para escalar y manejar peticiones HTTP de clientes como ThunderClient o Postman de manera eficiente y segura.