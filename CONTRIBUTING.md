# 🤝 Guía de Contribución — Monad Nexus

Esta guía explica cómo trabajar en el repositorio de forma ordenada. Léela antes de hacer tu primer commit.

---

## 📋 Reglas generales

- **Nadie pushea directo a `main`** — todo cambio entra por Pull Request.
- **Todo PR debe pasar el CI** antes de poderse mergear.
- **Nunca subas tu `.env`** — contiene claves privadas. Ya está en `.gitignore`, pero ten cuidado.
- Si tienes dudas, abre un Issue o pregunta en el grupo antes de hacer cambios grandes.

---

## 🌿 Convención de ramas

El nombre de tu rama debe seguir este formato:

```
feature/tu-nombre-descripcion-corta
```

**Ejemplos:**
```
feature/juanpablo-contrato-engine
feature/alejandro-pagina-dashboard
feature/cristian-script-deploy
feature/santiago-fix-wallet-conexion
```

### Cómo crear tu rama:

```bash
# Asegúrate de estar actualizado con main
git checkout main
git pull origin main

# Crea y cambia a tu nueva rama
git checkout -b feature/tu-nombre-tarea
```

---

## 💾 Hacer commits

Usa mensajes de commit descriptivos en español o inglés, en imperativo:

```bash
# ✅ Bueno
git commit -m "Agrega función de verificación on-chain en NexusEngine"
git commit -m "Fix: corrige conexión de wallet en Firefox"
git commit -m "Refactor: separa lógica de mapa en MapRenderer"

# ❌ Malo
git commit -m "cambios"
git commit -m "arreglos varios"
git commit -m "asdfgh"
```

---

## 🔁 Flujo completo de trabajo

```
1. git checkout main && git pull origin main
2. git checkout -b feature/tu-nombre-tarea
3. [ Haces tus cambios ]
4. git add .
5. git commit -m "Descripción clara del cambio"
6. git push origin feature/tu-nombre-tarea
7. Abre un Pull Request en GitHub hacia main
8. El CI corre automáticamente — espera a que pase ✅
9. Pide review a un compañero
10. Una vez aprobado, se mergea a main
```

---

## 🔍 El CI verifica automáticamente

Cuando abres un PR, GitHub Actions revisa que:

- ✅ Todos los archivos `.js` tienen sintaxis válida
- ✅ No subiste el archivo `.env`
- ✅ No hay claves privadas hardcodeadas en el código
- ✅ Los contratos `.sol` compilan sin errores

Si el CI falla ❌, **el PR no se puede mergear**. Revisa el error en la pestaña "Actions" del PR y corrígelo.

---

## 🆘 ¿Cómo sincronizarme si main avanzó?

Si mientras trabajabas en tu rama, alguien mergeó cambios a `main`:

```bash
git checkout main
git pull origin main
git checkout feature/tu-nombre-tarea
git merge main
# Resuelve conflictos si los hay, luego:
git push origin feature/tu-nombre-tarea
```

---

## ❓ ¿Preguntas?

Habla con **@Duque-Londono** o abre un Issue en el repositorio.
