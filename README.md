# Búsqueda y conversación artificial sobre información discreta

_Este proyecto es una aplicación web que permite subir un archivo pdf, procesarlo y guardar la información en uan base de datos vectorial.
Seguidamente poder conversar con un agente de inteligencia artificial para obtener información sobre dicha información almacenada._

Es un Trabajo Fin de Grado elaborado para el **Curso de Adaptación al Grado de Informática** de la [Universidad Internacional de La Rioja](https://www.unir.net/).

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

* Registrar una cuenta en [Clerk](https://www.clerk.dev/) y obtener las credenciales de la aplicación.
* Registrar una cuenta en [AWS S3](https://aws.amazon.com/s3/) y obtener las credenciales de la aplicación. 
  * Crear un bucket en S3.
* Registrar una cuenta en [Pinecone](https://www.pinecone.io/) y obtener las credenciales de la aplicación.
* Registrar una cuenta en [Open Ai](https://www.openai.com/) y obtener las credenciales de la aplicación.
* Registrar una cuenta en [Supabase](https://www.supabase.io/) y obtener las credenciales de la aplicación.
  * Crear una base de datos PostgreSQL en Supabase.

Se tiene que crear un archivo,  `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/documents
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/documents

# AWS S3
NEXT_PUBLIC_S3_ACCESS_KEY_ID=S3_ACCESS_KEY_ID
NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID=S3_SECRET_ACCESS_KEY_ID
NEXT_PUBLIC_S3_BUCKET_NAME=S3_BUCKET_NAME
NEXT_PUBLIC_S3_BUCKET_REGION=S3_BUCKET_REGION
NEXT_PUBLIC_S3_BUCKET_URL=S3_BUCKET_URL

# Pinecone
PINECONE_INDEX_NAME=PINECONE_INDEX_NAME
PINECONE_API_KEY=PINCEONE_API_KEY
PINECONE_ENVIRONMENT=PINCEONE_ENVIRONMENT

# Open Ai
OPENAI_API_KEY=OPENAI_API_KEY

# Database
DATABASE_URL=DATABASE_URL
```

### Instalación 🔧

_Clonar el repositorio_

```bash
git clone [repository url]
```

_Crear fichero `.env` con las variables de entorno_
_Instalar las dependencias_

```bash
cd [project folder]
npm install
```

_Ejecutar el proyecto en modo desarrollo_

```bash
npm run dev
```

_Abrir el navegador en la dirección `http://localhost:3000`_

_Disfrutar de la aplicación_

## Construido con 🛠️

* [Next.js](https://nextjs.org/) - El framework web usado
* [Tailwind CSS](https://tailwindcss.com/) - El framework de estilos
* [React](https://es.reactjs.org/) - La librería de JavaScript
* [Prisma](https://www.prisma.io/) - ORM para la base de datos

## Autores ✒️
* **Miguel Ángel Casanova Morales** - *Trabajo Inicial* - [Miguel Ángel Casanova Morales](https://www.linkedin.com/in/mikycasanova/)

## Agradecimientos 🎁

* A mi familia por su apoyo incondicional.
* A la universidad por darme la oportunidad de realizar este proyecto.

