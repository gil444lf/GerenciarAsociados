@echo off
cd /d "%~dp0"
title Gerenciar Asociados

echo.
echo === 1/4 Instalando dependencias ===
call npm install
if errorlevel 1 goto error

echo.
echo === 2/4 Generando cliente de Prisma ===
call npx prisma generate
if errorlevel 1 goto error

echo.
echo === 3/4 Creando base de datos y tablas (PostgreSQL) ===
call npx prisma migrate dev
if errorlevel 1 goto errordb

echo.
echo === 4/4 Iniciando el sitio ===
echo Sitio:  http://localhost:3000
echo Panel:  http://localhost:3000/login   (usuario: admin / clave: admin123)
echo.
start "" http://localhost:3000
call npm run dev
goto fin

:errordb
echo.
echo No se pudo conectar a PostgreSQL.
echo Revisa que Postgres este encendido y que la linea DATABASE_URL del archivo .env
echo tenga tu usuario y contrasena (por defecto: postgres / postgres).
goto error

:error
echo.
echo Algo fallo. Copia el mensaje de arriba y mandalo para corregirlo.

:fin
pause
