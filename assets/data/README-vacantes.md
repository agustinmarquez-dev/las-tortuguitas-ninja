# Vacantes Resumen

El mapa de calor lee primero `vacantes-resumen.csv`.
Tambien acepta `resumen-vacantes.csv`, pero el flujo recomendado es regenerar siempre el archivo embebido.

## Actualizacion semanal

1. Descargar la hoja `Resumen` como CSV.
2. Ejecutar desde la raiz del proyecto, indicando el archivo descargado:

```bash
npm run actualizar-vacantes -- ~/Downloads/resumen-vacantes.csv
```

Ese comando copia el CSV a `assets/data/vacantes-resumen.csv` y regenera `assets/data/vacantes-resumen-data.js`, que permite que el mapa funcione tambien al abrirlo localmente con `file://`.

Tambien se puede usar sin parametro si ya reemplazaste manualmente `assets/data/vacantes-resumen.csv`.
Si reemplazaste `assets/data/resumen-vacantes.csv`, el script lo copia al nombre esperado:

```bash
npm run actualizar-vacantes
```

3. Subir a GitHub:

```bash
git add assets/data/vacantes-resumen.csv assets/data/vacantes-resumen-data.js assets/data/resumen-vacantes.csv
git commit -m "Actualizar vacantes resumen"
git push
```

Formato esperado:

```csv
Local,Total,Pendientes,Cubiertas,% Cumpl.,ETM,ETR,ETN,GT,,Local,Total,Pendientes,Cubiertas,% Cumpl.,ETM,ETR,ETN,GT
SAAVEDRA,4,3,1,25%,,,,,,APER MATADEROS,17,10,7,41%,,1,,
```

Reglas:

- En el formato real de la hoja `Resumen`, Sabores Express queda en las columnas izquierdas y Hamburguesas Extremas en las columnas derechas.
- Para Sabores, el mapa lee:
  - nombre del local: columna 1
  - vacantes pendientes: columna 3
- Para Extremas, el mapa lee:
  - nombre del local: columna 11
  - vacantes pendientes: columna 13
- Los nombres de locales deben coincidir con las claves de coordenadas dentro de `pages/mapa-calor.html`.
