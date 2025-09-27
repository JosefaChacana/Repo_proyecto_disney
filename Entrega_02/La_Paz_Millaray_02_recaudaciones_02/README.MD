# Documentación 
Para comenzar con la recolección de datos, junto a mi dupla decidimos tener una base de inicio común, la cual sería tener una lista de todas las películas producidas y coproducidas por la franquicia. Para esto, nos dirigimos a **Wikipedia** y obtuvimos la lista completa de películas, desde 1937 hasta los estrenos más actuales, junto a su título original y traducido al español. 
Al pasar los datos al excel, cada una hizo su limpieza de datos en base a lo que iba a investigar. En mi caso, decidí dejar las variables de **“Título en español”, “Título original”, “Fecha de estreno”.** Con los datos de Wikipedia ya recolectados, eliminé los que no aportarían a la hipótesis, como “Producción para Disney+” o las distintas divisiones pertenecientes a una coproducción. 
Al proseguir con la recolección de datos, me dirigí a dos dataset de Kaggle: **“Disney Movies and Films Dataset”**(Disney Movies and Films Dataset), donde obtuve la cifra total destinada a la producción de la película, y la ordené en la columna de **“Inversión”**, Al igual que ocupé **“Disney Movies 1937-2016 Gross Income”** (Disney Movies 1937-2016 Gross Income) para los ingresos totales obtenidos a nivel mundial por la obra cinematográfica y los asigné en la columna de “Recaudación”. Ambas cifras en dólares (USD).
Pese a que la información que me proporcionaban los dataset era bastante completa, habían muchas casillas de películas que quedaban en blanco, es por esto que, hice una **búsqueda manual** aparte, de todas esas películas a través de IMDB (https://www.imdb.com/es/?ref_=tt_nv_home) para ir complementando los datos de inversión y recaudación que ya estaban en mi tabla. 
**Todos estos datos, a diferencia de la lista ya predeterminada de Wikipedia, fueron añadidos manualmente.** 

## Lista de fuentes de datos 
+ Desde Wikipedia, seleccioné la lista de todas las películas de la franquicia debido a que era la plataforma con los datos más completos. https://es.wikipedia.org/wiki/Anexo:Pel%C3%ADculas_de_Walt_Disney_Pictures
+ Ambos dataset que ocupé de Kaggle me ayudaron enormemente a ordenar las cifras de cada una de las películas en base a su respectiva inversión y recaudación. Disney Movies and Films Dataset y Disney Movies 1937-2016 Gross Income
+ Para las cifras que no encontré en ninguno de los dataset, IMDB fue de mucha ayuda, ya que me proporcionó las cifras de películas faltantes. https://www.imdb.com/es/?ref_=tt_nv_home. 

## Ejemplos de preguntas 
1. ¿Cuáles han sido las películas con mayor inversión en la historia de cintas producidas por Disney?
2. ¿Se puede ver reflejado una menor recaudación como consecuencia de una baja inversión?
3. ¿Existe una tendencia en el nivel de inversión de las obras a lo largo del tiempo (1937 a 2025)?
4. ¿Cuáles son las películas que obtuvieron las mayores recaudaciones a nivel mundial y en qué año fueron estrenadas?
