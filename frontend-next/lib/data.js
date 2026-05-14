export var DATA_LOGISTICA = {
  "familias": [
    {"id":1,"lat":5690,"lng":-76660,"personas":4},
    {"id":2,"lat":5695,"lng":-76658,"personas":7},
    {"id":3,"lat":5688,"lng":-76662,"personas":3},
    {"id":4,"lat":5700,"lng":-76655,"personas":5},
    {"id":5,"lat":5685,"lng":-76665,"personas":8},
    {"id":6,"lat":5692,"lng":-76659,"personas":2},
    {"id":7,"lat":5680,"lng":-76670,"personas":12},
    {"id":8,"lat":5698,"lng":-76663,"personas":4},
    {"id":9,"lat":5696,"lng":-76663,"personas":6},
    {"id":10,"lat":5687,"lng":-76654,"personas":5}
  ],
  "centros": [
    {"id":1,"nombre":"Bodega UNGRD Quibdo","lat":5694,"lng":-76661},
    {"id":2,"nombre":"Hospital San Francisco","lat":5690,"lng":-76660},
    {"id":3,"nombre":"Cruz Roja Istmina","lat":5685,"lng":-76650},
    {"id":4,"nombre":"Centro Logistica Condoto","lat":5698,"lng":-76665},
    {"id":5,"nombre":"Base Militar Tado","lat":5682,"lng":-76645}
  ]
};

export var DATA_CIBERSEGURIDAD = {
  "endpoints": [
    {"url":"https://api.gobierno.gov.co/v1/poblacion","method":"GET","status":"seguro"},
    {"url":"https://api.gobierno.gov.co/v1/salud","method":"GET","status":"seguro"},
    {"url":"https://api.gobierno.gov.co/v1/logistica","method":"POST","status":"vulnerable","vulnerabilidad":"SQL Injection en campo id"},
    {"url":"https://api.gobierno.gov.co/v1/usuarios","method":"GET","status":"vulnerable","vulnerabilidad":"Sin autenticacion"},
    {"url":"https://api.gobierno.gov.co/v1/inventario","method":"PUT","status":"seguro"},
    {"url":"https://api.gobierno.gov.co/v1/pagos","method":"POST","status":"vulnerable","vulnerabilidad":"No valida firmas"},
    {"url":"https://api.gobierno.gov.co/v1/mapas","method":"GET","status":"seguro"},
    {"url":"https://api.gobierno.gov.co/v1/alertas","method":"POST","status":"vulnerable","vulnerabilidad":"XSS en parametro msg"},
    {"url":"https://api.gobierno.gov.co/v1/reportes","method":"GET","status":"seguro"},
    {"url":"https://api.gobierno.gov.co/v1/auth","method":"POST","status":"vulnerable","vulnerabilidad":"Credenciales en texto plano"}
  ],
  "agentes": [
    {"id":"IA-001","nombre":"ScanBlocker","version":"2.4.1","accion":"Bloqueo automatico"},
    {"id":"IA-002","nombre":"FireWall Dinamico","version":"1.8.3","accion":"Filtrado inteligente"},
    {"id":"IA-003","nombre":"Auditor Virtual","version":"3.0.0","accion":"Analisis continuo"}
  ]
};

export var DATA_FARMACEUTICA = {
  "moleculas": [
    {"nombre":"Ribavirina","interacciones":142,"efectividad":72},
    {"nombre":"Favipiravir","interacciones":98,"efectividad":65},
    {"nombre":"Remdesivir","interacciones":215,"efectividad":88},
    {"nombre":"Molnupiravir","interacciones":76,"efectividad":55},
    {"nombre":"Paxlovid","interacciones":189,"efectividad":91},
    {"nombre":"Galidesivir","interacciones":54,"efectividad":41},
    {"nombre":"EIDD-2801","interacciones":132,"efectividad":78},
    {"nombre":"AT-527","interacciones":47,"efectividad":35},
    {"nombre":"PF-07321332","interacciones":167,"efectividad":83},
    {"nombre":"VV116","interacciones":91,"efectividad":60}
  ]
};
