---
layout:   post
title:    "Datos Abiertos para prevenir la Mortalidad Materna: Recomendaciones"
tagline:  "Generar recomendaciones para reducir la mortalidad materna."
author:   "Nick Eng | DSSG"
date:     2015-01-13 13:09:00 -0500
cover:    "historias/mortalidad-materna-recomendaciones/mortalidad-materna-recomendaciones_cover_photo-1284x460.jpg"
cover_photo: "historias/mortalidad-materna-recomendaciones/mortalidad-materna-recomendaciones_cover_photo-1284x460.jpg"
featured: false
datasets:
  -
    title: "Mortalidad Materna"
    url: http://catalogo.datos.gob.mx/dataset/mortalidad-materna
  -
    title: "Defunciones Generales"
    url: http://www.sinais.salud.gob.mx/basesdedatos/std_defunciones.html
  -
    title: "Recursos en Salud"
    url: http://catalogo.datos.gob.mx/dataset/recursos-en-salud
collaborators:
  - secretaria_salud

section:  historias
category: Salud
category_title: Salud
tags:
- salud
- mortalidad materna
redirect_from: /mortalidad-materna-recomendaciones/
published: true
---


[Anteriormente, escribimos](http://datos.gob.mx/historias/salud/reduciendo-mortalidad-materna.html) sobre el problema que enfrenta México en términos de mortalidad materna. **México ha colocado la reducción de la mortalidad materna como una iniciativa de alta prioridad** ya que en los últimos 10 años, la tasa de mortalidad materna en el país se ha mantenido relativamente estancada a pesar de la aplicación de diversas iniciativas como el Seguro Popular y Oportunidades.

Como resultado México pidió a **Data Science for Social Good Fellowship** de la Universidad Chicago ayudar a diseñar nuevas estrategias que podrían reducir la mortalidad materna. 

En este post, vamos a llevarlos por el proceso de desarrollo de recomendaciones que enviamos a México como resultado. 

##Los datos

**Nos dieron una serie de datos, incluyendo los registros de nacimiento y defunción, registros de altas de pacientes, información del hospital, y la información del censo**, todo que se remonta al menos a 1990. Teníamos mucha información para trabajar. Sin embargo, convertir toda esta información en algo útil.


Los datos que recibimos, alrededor de 400, venían en una variedad de formatos diferentes: bases de datos de Microsoft Access, Excel y CSV. Así que había un poco de secuencias de comandos inicial involucrado sólo para convertir y cargar todo en una base de datos. A partir de ahí teníamos que escribir scripts adicionales para limpiar los datos de malas fechas (de acuerdo con los datos, algunas personas estaban cerca de 100 años de edad y tenían bebés). Trabajamos con las diferencias de cómo se codificaron las variables entre los años. 

**Sólo este paso inicial de configuración representa valor para México**, ya que resultó que nunca se había creado un conjunto de datos único consolidado y limpio sobre mortalidad materna.

![Tabla de modelado de Municipio]({{ site.url | append: site.baseurl }}/assets/images/historias/mortalidad-materna-recomendaciones/mortalidad-materna-recomendaciones_01.png)

##¿Y ahora qué?

Después de desarrollar esta base de datos, **había que formar una visión integral de la información, identificar los puntos fuertes y débiles, y ver el potencial de lo que se podía hacer.** 

Queríamos llegar hipótesis, tales como estudiar el impacto de las diferentes compañías de seguros en los índices de mortalidad, y luego generar diversos cortes de los datos para ponerlos a prueba.

**Nos enfocamos en juntar todos estos datos en algo significativo, desarrollamos un modelo estadístico que predice la mortalidad materna**, y posteriormente examinamos el modelo y sus variables para comprender mejor los principales factores que contribuyen a o se correlacionan con el resultado. 

En teoría, este modelo podría decirnos que una madre de una zona pobre tiene X veces más probabilidades de sufrir una muerte materna que una madre de una zona rica, o que ser pobre es Y veces más importante que ser analfabeta. Sin embargo, nos dimos cuenta que este nivel de detalle requeriría un conjunto de datos a nivel individual de las madres en México, lo que la falta de identificadores entre nuestros conjuntos de datos hizo imposible realizar. 

Por lo anterior, **modificamos nuestro enfoque inicial y desarrollamos un modelo a nivel de municipio**. En lugar de utilizar los atributos de un madre individual para determinar su posibilidad de supervivencia, usamos los atributos de la municipalidad (como qué porcentaje de la población habla una lengua indígena, o qué por ciento tenía acceso a los bienes públicos, etc.) para modelar las tasas de mortalidad para las madres en esa zona.

##El Pipeline


**Aunque teóricamente el el enfoque era bueno, planteaba una serie de retos**. Por ejemplo, aunque algunos municipios rurales podrían ser muy pequeños, sobre el periodo de cuatro años que utilizamos para los datos (cuando la tasa de mortalidad parecía más estable y sin cambios por diversas iniciativas implementadas) podrían no haberse visto muertes materna. Por lo tanto aquellos municipios que parecían que tenían una tasa de mortalidad materna de 0,  en realidad sabíamos que eran áreas que no eran libres de riesgo. Asimismo, en los municipios pequeños, una sola muerte materna podría  alcanzar el nivel más alto de la tasa de mortalidad ya que la población era pequeña y el número de nacimientos era alto. 

**¿Cómo aseguramos de que esos factores no afectarán nuestro modelo?** ¿Nos fijamos únicamente en los municipios con un cierto tamaño de la población? ¿O en aquellos con al menos una muerte? ¿No deberíamos modelar la tasa de mortalidad materna, sino una característica específica como por ejemplo, si una muerte materna ocurrió, o si la tasa estaba por encima de un cierto valor?

Por otra parte, llegamos a otras preguntas críticas. ¿Deberíamos de probar el modelo con la población de un municipio? Esto podría restar importancia a los pequeños municipios donde el problema es grave, pero podría ser más representativo del país en su conjunto. Además, ¿cómo debemos tratar con variables correlacionadas o factores que no son independientes pero están relacionados de alguna manera? Estas variables son un problema para algunas técnicas de modelado, y hay varias formas de mitigar los efectos adversos de su impacto. Sin buenas respuestas a cualquiera de estas preguntas, hemos decidido que la ciencia de datos resuelva las preguntas por nosotros. 

Desarrollamos un *pipeline* para nuestro análisis en el que se ejecutan todas las diferentes variables y posibilidades y generando un reporte para cada una de ellas. El *pipeline* también genera diferentes modelos de cada variable, ya sea de regresión logística, árbol de decisión, o bosque al azar, para ver cuál se ajusta mejor a los datos y considera si existen variables con igualdad de importancia y diferente enfoque. A partir de ahí, podríamos mirar las variables importantes producto de cada variación, cuáles son consistentes, cuáles no, y, finalmente, elaborar una lista de 5 a 10 factores clave que podríamos considerar para formular recomendaciones para el desarrollo de  políticas públicas.


![Reducción de Factores Clave]({{ site.url | append: site.baseurl }}/assets/images/historias/mortalidad-materna-recomendaciones/mortalidad-materna-recomendaciones_03.png)


##Resultados

**Generamos varias recomendaciones a México para reducir la mortalidad materna, sobre todo en la intersección de los servicios de salud y la pobreza.**

Aumentar la atención prenatal a las poblaciones marginadas, potencialmente a través de la creación de un programa de incentivos para fomentar las visitas prenatales.	
Investigar los casos de cesárea en los hospitales de la Secretaría de Salud, ya que se observaron mucho más altas las tasas de mortalidad materna en estos hospitales.
Investigar tratamientos diferenciales en los hospitales en función del tipo de seguro (como 	detallamos en nuestro post anterior).

Para 1), se encontró que **las consultas prenatales tienen una fuerte relación inversa con la mortalidad materna**, incluso después de controlar la pobreza de una región. Las condiciones relacionadas con la falta de atención prenatal, tales como la eclampsia, representan algunas de las causas más frecuentes de muerte materna en México, indican que **el aumento de las consultas prenatales y el comienzo oportuno de estas puede mitigar algunas de las mayores causas de muerte**. Determinamos que incentivar a las madres a buscar cuidado prenatal temprano y con frecuencia podría tener efectos positivos en la reducción de la mortalidad materna.

De hecho, ya existen este tipo de programas de incentivos para ciertas poblaciones, madres aseguradas por el IMSS reciben prestaciones de maternidad sólo si cumplen con ciertos requisitos prenatales. Como resultado, un 15-20% más madres aseguradas por el IMSS reciben atención prenatal en el primer trimestre frente a la población que cuenta con Seguro Popular, y realizan 2 visitas prenatales más durante el transcurso de su embarazo. Tal programa de incentivos también tendría un impacto mucho mayor en poblaciones muy pobres que son 30% menos propensas a recibir atención prenatal en el primer trimestre y realizan 2 consultas prenatales consulta durante un embarazo, en promedio.

Para los puntos 2 y 3, encontramos que, dada la misma población, las madres que dan a luz por cesárea en los hospitales de la Secretaría de Salud tienen una tasa de mortalidad mucho más alta que los que están en los hospitales del Sector Salud. Además, las madres del Seguro Popular que asisten los hospitales del Sector Salud (y por lo tanto tienen un desfase de seguros) tienen mucho más altas tasas de mortalidad que aquellos que sin son beneficiarios, dada la misma población. 

**Si bien no hemos podido determinar la causa exacta de estas relaciones a partir de los datos, alentamos al gobierno mexicano a investigar más a fondo estos efectos, ya que puede haber cambios operacionales que podrían reducir el número de estas muertes.**


![Accesibilidad, Secciones de Cesárea, Cuidado prenatal]({{ site.url | append: site.baseurl }}/assets/images/historias/mortalidad-materna-recomendaciones/mortalidad-materna-recomendaciones_02.png)

##Impacto

Una de nuestras recomendaciones ya ha ganado algo tracción. **Nuestros hallazgos acerca de la importancia de la atención prenatal puso en acción una iniciativa entre México y el UNICEF para proporcionar teléfonos móviles y enviar mensajes de texto a las madres en riesgo para animarlas a buscar atención prenatal.** Además de aumentar la atención prenatal a través del programa, **México espera recoger también información adicional sobre las madres en riesgo, tales como el tiempo y la calidad de sus visitas prenatales y la identificación de a lo que las madres son más sensibles a qué tipos de intervenciones.** Esta información impulsará nuevas iniciativas que permitan reducir aún más la mortalidad materna es de esperar en el país.

##Reflexión

Este verano nuestro equipo asumió un problema verdaderamente interesante e impactante para ayudar a México a encontrar nuevas formas de reducir la mortalidad materna. Para nosotros, trabajar en un problema con un amplio alcance y con un objetivo tan significativo fue algo que nunca habíamos hecho antes. Todo fue muy rápido, ya que no sólo teníamos que apurarnos con los datos, sino también con temas relacionados con la mortalidad materna en países en desarrollo, especialmente en el contexto de México. Y, afortunadamente, **con estos datos hemos sido capaces de generar acciones concretas los resultados que han dado lugar a iniciativas de verdad**. El programa fue una experiencia increíble en la que disfrutamos hacer trabajo impactante y aprendimos mucho. 



