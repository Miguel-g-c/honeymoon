const china = 'china';
const indonesia = 'indonesia';
const loc = (name, local, address, region = china) => ({ name, local, address, region });

export const LOCATIONS = {
  mad: loc('Aeropuerto Adolfo Suárez Madrid-Barajas', 'Aeropuerto de Madrid', 'Madrid, España', indonesia),
  pek: loc('Aeropuerto Internacional de Pekín Capital', '北京首都国际机场', 'Beijing Capital International Airport, Shunyi, Beijing'),
  beijingWest: loc('Estación de Pekín Oeste', '北京西站', 'Beijing West Railway Station, Fengtai, Beijing'),
  zjjAirport: loc('Aeropuerto Hehua de Zhangjiajie', '张家界荷花国际机场', 'Zhangjiajie Hehua International Airport, Yongding, Zhangjiajie'),
  zjjWest: loc('Estación Oeste de Zhangjiajie', '张家界西站', 'Zhangjiajie West Railway Station, Yongding, Zhangjiajie'),
  furongStation: loc('Estación de Furong', '芙蓉镇站', 'Furongzhen Railway Station, Yongshun, Xiangxi'),
  fenghuangStation: loc('Estación de Fenghuang', '凤凰古城站', 'Fenghuang Ancient Town Railway Station, Fenghuang'),
  guilinNorth: loc('Estación Norte de Guilin', '桂林北站', 'Guilinbei Railway Station, Diecai, Guilin'),
  guilinAirport: loc('Aeropuerto Liangjiang de Guilin', '桂林两江国际机场', 'Guilin Liangjiang International Airport, Lingui, Guilin'),
  pudong: loc('Aeropuerto Internacional de Shanghái Pudong', '上海浦东国际机场', 'Shanghai Pudong International Airport, Pudong, Shanghai'),
  baliAirport: loc('Aeropuerto Internacional Ngurah Rai', 'Bandar Udara Internasional I Gusti Ngurah Rai', '-8.7482, 115.1672', indonesia),
  padangBai: loc('Puerto de Padang Bai', 'Pelabuhan Padang Bai', '-8.5328, 115.5080', indonesia),
  giliHarbour: loc('Puerto de Gili Trawangan', 'Pelabuhan Gili Trawangan', '-8.3526, 116.0385', indonesia),
  dongsi: loc('Dongsi, salida E', '东四地铁站 E口', 'Dongsi Subway Station Exit E, Dongcheng, Beijing'),
  forbidden: loc('Ciudad Prohibida', '故宫博物院', 'The Palace Museum, Dongcheng, Beijing'),
  mutianyu: loc('Gran Muralla de Mutianyu', '慕田峪长城', 'Mutianyu Great Wall, Huairou, Beijing'),
  summerPalace: loc('Palacio de Verano', '颐和园', 'Summer Palace, Haidian, Beijing'),
  forestPark: loc('Parque Forestal Nacional de Zhangjiajie', '张家界国家森林公园', 'Zhangjiajie National Forest Park, Wulingyuan'),
  tianmen: loc('Montaña Tianmen', '天门山国家森林公园', 'Tianmen Mountain National Forest Park, Yongding, Zhangjiajie'),
  furongWaterfall: loc('Cascada de Furong', '芙蓉镇大瀑布', 'Furong Town Waterfall, Yongshun, Xiangxi'),
  fenghuangOld: loc('Ciudad antigua de Fenghuang', '凤凰古城', 'Fenghuang Ancient Town, Xiangxi'),
  longji: loc('Terrazas de arroz Longji Jinkeng', '龙脊梯田金坑大寨', 'Jinkeng Rice Terraces, Dazhai, Longsheng, Guilin'),
  moonHill: loc('Moon Hill', '月亮山', 'Moon Hill, Yangshuo, Guilin'),
  yulong: loc('Río Yulong', '遇龙河', 'Yulong River, Yangshuo, Guilin'),
  disney: loc('Shanghai Disneyland', '上海迪士尼度假区', 'Shanghai Disney Resort, Pudong, Shanghai'),
  bund: loc('El Bund', '外滩', 'The Bund, Huangpu, Shanghai'),
  jadeBuddha: loc('Templo del Buda de Jade', '玉佛禅寺', 'Jade Buddha Temple, Jing’an, Shanghai'),
  purnama: loc('Purnama House Kuta', 'Purnama House Kuta', '-8.7404, 115.1708', indonesia),
  wilsons: loc('Wilson’s Retreat', 'Wilson’s Retreat', '-8.3493, 116.0375', indonesia),
  anja: loc('Anja Jimbaran', 'Anja Jimbaran', '-8.7702, 115.1682', indonesia),
};

export const STAYS = [
  { id:'sunworld', name:'Sunworld Dynasty Hotel Beijing Wangfujing', local:'北京王府井大饭店', address:'50 Wangfujing Avenue, Dongcheng, Beijing', dates:'31 ago — 3 sep', location:loc('Sunworld Dynasty Hotel Beijing Wangfujing','北京王府井大饭店','50 Wangfujing Avenue, Dongcheng, Beijing') },
  { id:'yurealm', name:'Zhangjiajie Yu Realm Hotel', local:'张家界裕润酒店', address:'No. 200 Jundi Road, Wulingyuan, Zhangjiajie', dates:'3 — 6 sep', location:loc('Zhangjiajie Yu Realm Hotel','张家界裕润酒店','No. 200 Jundi Road, Wulingyuan, Zhangjiajie') },
  { id:'huaqianshu', name:'Huaqianshu Theme Inn', local:'花千树主题客栈', address:'No. 14 Zoumaping, Furong Town/Wangcun', dates:'6 — 7 sep', location:loc('Huaqianshu Theme Inn','花千树主题客栈','No. 14 Zoumaping, Furong Town/Wangcun') },
  { id:'fenghuang', name:'Phoenix Misty Rain Cloud Resort (vicinity)', local:'烟雨云兮度假酒店附近', address:'Phoenix Building, No. 1 Phoenix South Road, Fenghuang', dates:'7 — 8 sep', location:loc('Phoenix Misty Rain Cloud Resort','烟雨云兮度假酒店','Phoenix Building, No. 1 Phoenix South Road, Fenghuang') },
  { id:'yunshang', name:'Yunshang Chenxi Wisdom Homestay', local:'云上晨曦智慧民宿', address:'No. 240, Group 1, Tiantouzhai, Dazhai Village, Longji', dates:'8 — 9 sep', location:loc('Yunshang Chenxi Wisdom Homestay','云上晨曦智慧民宿','No. 240, Group 1, Tiantouzhai, Dazhai Village, Longji') },
  { id:'yangshuo', name:'Yangshuo Li River Resort', local:'阳朔漓江度假酒店', address:'#1 Shuangtan Village, Yangshuo', dates:'9 — 11 sep', location:loc('Yangshuo Li River Resort','阳朔漓江度假酒店','#1 Shuangtan Village, Yangshuo') },
  { id:'elong', name:'Shanghai Elong Hotel by the Bund and Nanjing Road', local:'上海艺龙酒店', address:'No. 595 Jiujiang Road, Huangpu, Shanghai', dates:'11 — 15 sep', location:loc('Shanghai Elong Hotel','上海艺龙酒店','No. 595 Jiujiang Road, Huangpu, Shanghai') },
  { id:'purnama', name:'Purnama House Kuta', local:'Purnama House Kuta', address:'Jalan Puri Grenceng Gang Mangga No. 1, Tuban/Kuta', dates:'15 — 16 sep', location:LOCATIONS.purnama },
  { id:'wilsons', name:'Wilson’s Retreat', local:'Wilson’s Retreat', address:'North Beach, Gili Trawangan', dates:'16 — 19 sep', location:LOCATIONS.wilsons },
  { id:'anja', name:'Anja Jimbaran', local:'Anja Jimbaran', address:'Jl. Yoga Perkanthi No. 2, Jimbaran', dates:'19 — 20 sep', location:LOCATIONS.anja },
];

const event = (time, icon, action, location, note = '', status = '') => ({ time, icon, action, location, note, status });
export const DAYS = [
  { date:'2026-08-30', city:'Madrid → Pekín', country:china, type:'Viaje', events:[event('17:30','✈','Salida Air China desde MAD',LOCATIONS.mad,'Noche a bordo. Llega con margen al aeropuerto.','booked')] },
  { date:'2026-08-31', city:'Pekín', country:china, type:'Llegada', stay:'sunworld', events:[event('10:25','✈','Llegada a PEK',LOCATIONS.pek,'Transfer y cambio de efectivo/eSIM si hace falta.','booked'),event('Tarde','⌂','Check-in y paseo suave',STAYS[0].location,'Wangfujing y opción Jingshan/casco antiguo; noche temprana.')] },
  { date:'2026-09-01', city:'Pekín', country:china, type:'Visita', events:[event('Mañana','◆','Tour guiado Ciudad Prohibida (4 h)',LOCATIONS.forbidden,'Lleva identificación válida; guía en inglés.','booked'),event('Tarde','◌','Tiananmen o Templo del Cielo',loc('Plaza de Tiananmen','天安门广场','Tiananmen Square, Dongcheng, Beijing'),'Según ritmo y acceso.'),event('Cena','☷','Pato de Pekín',loc('1949 Duck de Chine','全聚德1949','23 Shunyi North Street, Chaoyang, Beijing'),'Sugerencia: reserva o comprueba horario.')] },
  { date:'2026-09-02', city:'Pekín', country:china, type:'Excursión', events:[event('07:10','●','Punto de encuentro del tour',LOCATIONS.dongsi,'Salida E, esquina noroeste. Llega antes.','booked'),event('Mañana','◆','Mutianyu + teleférico opcional',LOCATIONS.mutianyu,'Tour pagado; el teleférico puede ser extra.','booked'),event('Tarde','◆','Palacio de Verano',LOCATIONS.summerPalace,'Final previsto aprox. 17:36; posible bajada Bird’s Nest/Water Cube.','booked')] },
  { date:'2026-09-03', city:'Pekín → Zhangjiajie', country:china, type:'Traslado', stay:'yurealm', events:[event('Mañana','☕','Mañana tranquila en Pekín',LOCATIONS.beijingWest,'Deja margen suficiente hacia PEK.'),event('19:15','✈','Salida PEK → Zhangjiajie',LOCATIONS.pek,'Vuelo Air China; llegada prevista 21:45.','booked'),event('21:45','✈','Llegada a Zhangjiajie Hehua',LOCATIONS.zjjAirport,'Abre la ruta para la recogida hotelera preacordada.','booked'),event('21:45','⌂','Recogida y check-in',STAYS[1].location,'Recogida hotelera preacordada.','booked')] },
  { date:'2026-09-04', city:'Zhangjiajie', country:china, type:'Parque', events:[event('Temprano','◆','Parque Nacional: ruta este',LOCATIONS.forestPark,'Bailong Elevator, Yuanjiajie, Yangjiajie y Tianzi Mountain.','booked'),event('Todo el día','!','Tiempo y calzado',LOCATIONS.forestPark,'Empieza pronto; revisa lluvia, capas y calzado de agarre.')] },
  { date:'2026-09-05', city:'Zhangjiajie', country:china, type:'Parque', events:[event('Mañana','◆','Parque Nacional: puerta sur',LOCATIONS.forestPark,'Entrada y ruta sur.','booked'),event('Tarde','◆','Montaña Tianmen, ruta B',LOCATIONS.tianmen,'Entradas ya pagadas; confirma la logística local.','booked')] },
  { date:'2026-09-06', city:'Zhangjiajie → Furong', country:china, type:'Tren', stay:'huaqianshu', events:[event('10:30','⌁','Estar en Zhangjiajie West',LOCATIONS.zjjWest,'Llega una hora antes y comprueba puerta/plataforma.','booked'),event('11:30–11:53','🚄','G5665 · coche 07 · 007F / 007D',LOCATIONS.furongStation,'Trayecto Zhangjiajie West → Furong.','booked'),event('Tarde','⌂','Check-in + cascada y casco antiguo',STAYS[2].location,'Haz la ruta de la cascada; guarda la vista azul/noche.')] },
  { date:'2026-09-07', city:'Furong → Fenghuang', country:china, type:'Tren', stay:'fenghuang', events:[event('09:28','⌁','Estar en estación de Furong',LOCATIONS.furongStation,'Llega una hora antes.','booked'),event('10:28–11:01','🚄','G3847 · coche 04 · 006B / 006A',LOCATIONS.fenghuangStation,'Trayecto Furong → Fenghuang.','booked'),event('Mediodía','⚑','Transfer al hotel',STAYS[3].location,'Taxi, coche del hotel o bus: confirma la indicación actual del alojamiento.','confirm'),event('Noche','◌','Río Tuojiang, Hongqiao y luces',LOCATIONS.fenghuangOld,'Paseo por la ribera y pagoda Wanming.')] },
  { date:'2026-09-08', city:'Fenghuang → Longji', country:china, type:'Tren + bus', stay:'yunshang', warning:'Conexión muy justa: llegada a Guilin Norte 14:13 frente al último bus reportado a Longji a las 15:00. Confírmala antes de salir y prepara alternativa privada.', events:[event('07:09','⌁','Estar en estación de Fenghuang',LOCATIONS.fenghuangStation,'Llega una hora antes.','booked'),event('08:09–14:13','🚄','D3967 · coche 05 · asientos 2A / 2B',LOCATIONS.guilinNorth,'Fenghuang → Guilin Norte.','booked'),event('14:13','⚑','Parking 1 → Longji / Tiantouzhai',LOCATIONS.longji,'Conexión must-confirm; último bus comunicado aprox. 15:00.','confirm'),event('Tarde','⌂','Check-in en Jinkeng',STAYS[4].location,'Coordina recogida/traslado con el alojamiento.')] },
  { date:'2026-09-09', city:'Longji → Yangshuo', country:china, type:'Traslado', stay:'yangshuo', events:[event('Mañana','◌','Miradores de las terrazas',LOCATIONS.longji,'Aprovecha la luz de la mañana.'),event('Antes de 16:00','⚑','Traslado a Yangshuo',STAYS[5].location,'Se reporta último bus a las 16:00: confírmalo con el hotel.','confirm'),event('Noche','☷','West Street',loc('West Street','西街','West Street, Yangshuo, Guilin'),'Paseo y cena tranquila.')] },
  { date:'2026-09-10', city:'Yangshuo', country:china, type:'Paisaje', events:[event('Mañana','◌','Moon Hill',LOCATIONS.moonHill,'Sube temprano para evitar calor.'),event('Tarde','◌','Yulong River',LOCATIONS.yulong,'E-bike o balsa de bambú según disponibilidad; confirma precio.'),event('Atardecer','◌','Mirador Xianggong',loc('Xianggong Hill','相公山','Xianggong Mountain, Yangshuo, Guilin'),'Solo si el transporte encaja.'),event('Noche','★','West Street o Impression Liu Sanjie',loc('Impression Liu Sanjie','印象刘三姐','Impression Liu Sanjie, Yangshuo, Guilin'),'Comprueba horario y entradas.')] },
  { date:'2026-09-11', city:'Yangshuo → Shanghái', country:china, type:'Vuelo', stay:'elong', events:[event('Tarde','⚑','Traslado a Guilin Airport',LOCATIONS.guilinAirport,'Cuenta al menos 1 h 15 min más colchón desde Yangshuo.'),event('20:25–22:50','✈','China Eastern · Guilin → Shanghái',LOCATIONS.pudong,'Vuelo y llegada nocturna.','booked'),event('Noche','⌂','Check-in cerca del Bund',STAYS[6].location,'Llegada tardía; deja resuelta la ruta desde el aeropuerto.')] },
  { date:'2026-09-12', city:'Shanghái', country:china, type:'Ciudad', events:[event('Mañana','◆','Templo del Buda de Jade',LOCATIONS.jadeBuddha,'Comprueba acceso y horario.'),event('Tarde','◌','Bund y Nanjing Road',LOCATIONS.bund,'Opción: ferry a Pudong o mirador de skyline.'),event('Noche','★','Luces de Pudong',LOCATIONS.bund,'Paseo sin prisa.')] },
  { date:'2026-09-13', city:'Shanghái', country:china, type:'Libre', events:[event('Mañana','◌','Concesión Francesa y Fuxing Park',loc('Fuxing Park','复兴公园','Fuxing Park, Huangpu, Shanghai'),'Paseo, café y ritmo libre.'),event('Tarde','◌','Tianzifang',loc('Tianzifang','田子坊','Tianzifang, Huangpu, Shanghai'),'Calles pequeñas y tiendas.'),event('Atardecer','◌','Bund / Pudong',LOCATIONS.bund,'Repite la vista que más os guste.')] },
  { date:'2026-09-14', city:'Shanghái', country:china, type:'Parque', events:[event('Todo el día','◆','Shanghai Disneyland',LOCATIONS.disney,'Pasaportes requeridos. El código de reserva queda fuera de la app.','booked')] },
  { date:'2026-09-15', city:'Shanghái → Bali', country:indonesia, type:'Vuelo', stay:'purnama', events:[event('Mañana','☕','Mañana libre',LOCATIONS.bund,'Último paseo o compras ligeras.'),event('17:40–23:55','✈','China Eastern · Shanghái → Bali',LOCATIONS.baliAirport,'Llegada tarde.','booked'),event('Noche','⌂','Check-in Kuta',STAYS[7].location,'Traslado breve y descanso.')] },
  { date:'2026-09-16', city:'Bali → Gili Trawangan', country:indonesia, type:'Barco', stay:'wilsons', events:[event('06:30','⚑','Recogida aproximada',LOCATIONS.purnama,'Confirma con el operador el día anterior.','confirm'),event('08:00','⚑','Check-in en Padang Bai',LOCATIONS.padangBai,'Lleva efectivo y protección para equipaje.'),event('09:00','⛴','Fast boat a Gili Trawangan',LOCATIONS.giliHarbour,'Horario a confirmar con el operador.','booked'),event('Llegada','⌂','Coche de caballos + check-in',STAYS[8].location,'Traslado local hasta North Beach.')] },
  { date:'2026-09-17', city:'Gili Trawangan', country:indonesia, type:'Mar', events:[event('Mañana','◌','Snorkel norte / tortugas',LOCATIONS.wilsons,'Pregunta por corrientes y condiciones.'),event('Tarde','◌','Vuelta en bici',LOCATIONS.giliHarbour,'Circuito sin prisas.'),event('Atardecer','★','Puesta de sol oeste',loc('West Beach Gili Trawangan','West Beach Gili Trawangan','-8.3558, 116.0335',indonesia),'Llega antes de que baje el sol.')] },
  { date:'2026-09-18', city:'Gili Trawangan', country:indonesia, type:'Mar', events:[event('Mañana','◌','Snorkel o buceo',LOCATIONS.giliHarbour,'Elige según mar y ganas.'),event('Tarde','♡','Spa o descanso',STAYS[8].location,'Día flexible.'),event('Noche','★','Cena especial',loc('Casa Vintage Beach','Casa Vintage Beach, Gili Trawangan','-8.3549, 116.0336',indonesia),'Comprueba disponibilidad.')] },
  { date:'2026-09-19', city:'Gili → Jimbaran', country:indonesia, type:'Barco', stay:'anja', events:[event('14:00','⚑','Check-in en puerto',LOCATIONS.giliHarbour,'Confirma el muelle con el operador.'),event('15:00','⛴','Fast boat a Padang Bai',LOCATIONS.padangBai,'Traslado privado a Jimbaran después.','booked'),event('Noche','⌂','Check-in y cena ligera',STAYS[9].location,'Según hora real de llegada.')] },
  { date:'2026-09-20', city:'Bali → Madrid', country:indonesia, type:'Regreso', events:[event('Mañana','◌','Mañana lenta en Jimbaran',STAYS[9].location,'Mercado de pescado o almuerzo de playa opcional.'),event('19:20','✈','Vuelo a Madrid vía Doha',LOCATIONS.baliAirport,'Deja margen amplio para el aeropuerto.','booked')] },
  { date:'2026-09-21', city:'Madrid', country:indonesia, type:'Llegada', events:[event('07:35','✈','Llegada a Madrid',LOCATIONS.mad,'Fin del viaje. Bienvenidos a casa.','booked')] },
];

export const RECOMMENDATIONS = [
  {city:'Pekín',name:'1949 Duck de Chine',local:'1949 全鸭季',why:'La experiencia de pato pequinés pedida para una cena especial.',signature:'Pato de Pekín',price:'€€€',status:'suggested',day:'2026-09-01',source:'https://guide.michelin.com/es/es/beijing-municipality/beijing/restaurante/1949-duck-de-chine',location:loc('1949 Duck de Chine','1949 全鸭季','23 Shunyi North Street, Chaoyang, Beijing')},
  {city:'Pekín',name:'The Red Chamber',local:'大红灯笼',why:'Alternativa Bib Gourmand de cocina norteña y pato.',signature:'Cocina del norte',price:'€€',status:'suggested',day:'2026-09-01',source:'https://guide.michelin.com/',location:loc('The Red Chamber','大红灯笼','Beijing, China')},
  {city:'Pekín',name:'Liu Ma Ma Dumplings / Gong De Lin',local:'刘妈妈饺子 / 功德林',why:'Opción asequible para comer bien entre visitas.',signature:'Dumplings o cocina vegetariana',price:'€',status:'suggested',day:'2026-08-31',source:'https://guide.michelin.com/',location:loc('Liu Ma Ma Dumplings','刘妈妈饺子','Beijing, China')},
  {city:'Zhangjiajie',name:'三下锅 cerca de Wulingyuan',local:'三下锅',why:'Especialidad local de olla compartida para una cena sencilla.',signature:'Sanxiaguo, cerdo ahumado o pescado agrio',price:'€',status:'must confirm',day:'2026-09-04',source:'https://www.amap.com/',location:loc('Restaurante 三下锅','三下锅','Wulingyuan, Zhangjiajie')},
  {city:'Furong',name:'Restaurante familiar del casco antiguo',local:'芙蓉镇本地菜',why:'Busca uno animado junto al sendero de la cascada, sin prometer un nombre no verificado.',signature:'米豆腐 (tofu de arroz)',price:'€',status:'must confirm',day:'2026-09-06',source:'https://www.amap.com/',location:LOCATIONS.furongWaterfall},
  {city:'Fenghuang',name:'Da Guo Da Zao Chai Huo Restaurant',local:'大锅大灶柴火饭店',why:'Opción asequible respaldada por Trip.com para probar cocina local.',signature:'血粑鸭, sopa de pescado agria',price:'€',status:'suggested',day:'2026-09-07',source:'https://www.trip.com/',location:loc('Da Guo Da Zao Chai Huo Restaurant','大锅大灶柴火饭店','Fenghuang, Xiangxi')},
  {city:'Longji',name:'Cocina del homestay',local:'民宿厨房',why:'La opción más práctica tras el traslado y la más conectada con el lugar.',signature:'Arroz en bambú, té de aceite Yao, cerdo ahumado',price:'€',status:'suggested',day:'2026-09-08',source:'https://www.trip.com/hotels/detail/?hotelId=109700425&checkIn=2026-09-08&checkOut=2026-09-09&locale=en-XX',location:STAYS[4].location},
  {city:'Yangshuo',name:'Liujie o Xie Dajie Beer Fish',local:'啤酒鱼',why:'Plato clásico del río Li para una cena de Yangshuo.',signature:'Pescado a la cerveza',price:'€€',status:'must confirm',day:'2026-09-10',source:'https://www.amap.com/',location:loc('Beer Fish, West Street','啤酒鱼','West Street, Yangshuo, Guilin'),note:'Confirma antes el peso y el precio del pescado.'},
  {city:'Shanghái',name:'Lao Di Fang Mian Guan',local:'老地方面馆',why:'Noodles Bib Gourmand para una comida sin ceremonia.',signature:'Noodles',price:'€',status:'suggested',day:'2026-09-12',source:'https://guide.michelin.com/',location:loc('Lao Di Fang Mian Guan','老地方面馆','Shanghai, China')},
  {city:'Shanghái',name:'Da Hu Chun / Jia Jia Tang Bao',local:'大壶春 / 佳家汤包',why:'Dos clásicos rápidos para shengjian o xiaolongbao.',signature:'Shengjian y xiaolongbao',price:'€',status:'suggested',day:'2026-09-13',source:'https://guide.michelin.com/',location:loc('Da Hu Chun','大壶春','Huangpu, Shanghai')},
  {city:'Gili Trawangan',name:'Jali Kitchen / Wilson’s',local:'Jali Kitchen',why:'Cena cómoda en el norte con alternativa práctica junto al hotel.',signature:'Cena relajada de isla',price:'€€',status:'must confirm',day:'2026-09-17',source:'https://www.google.com/maps',location:loc('Jali Kitchen','Jali Kitchen, Gili Trawangan','-8.3489, 116.0381',indonesia)},
  {city:'Gili Trawangan',name:'Casa Vintage Beach',local:'Casa Vintage Beach',why:'Una opción de playa para la puesta de sol.',signature:'Cóctel y cena al atardecer',price:'€€',status:'must confirm',day:'2026-09-18',source:'https://www.google.com/maps',location:loc('Casa Vintage Beach','Casa Vintage Beach, Gili Trawangan','-8.3549, 116.0336',indonesia)},
  {city:'Jimbaran',name:'Mercado de pescado + warung',local:'Pasar Ikan Kedonganan',why:'La manera más clara de buscar marisco con buena relación calidad-precio.',signature:'Pescado y marisco a la parrilla',price:'€€',status:'must confirm',day:'2026-09-20',source:'https://www.google.com/maps',location:loc('Kedonganan Fish Market','Pasar Ikan Kedonganan','-8.7552, 115.1742',indonesia),note:'Acordad peso y precio antes de cocinar.'},
];

export const SOURCES = [
  {label:'Tour Ciudad Prohibida',url:'https://www.trip.com/things-to-do/detail/90357030'},
  {label:'Tour Mutianyu + Palacio de Verano',url:'https://www.trip.com/things-to-do/detail/69221099'},
  {label:'Guía AMap URI',url:'https://developer.amap.com/api/uri-api/guide/travel/route'},
];

export const KIT = {
  checklist:['Pasaportes y visados si aplican','Seguro de viaje','Alipay / WeChat Pay configurados','Decisión eSIM / VPN','Traducción sin conexión y AMap','Efectivo, cargadores y power bank','IDs y confirmaciones guardados en privado'],
  phrases:[['请带我们去这里','Llévenos aquí'],['不要辣 / 微辣','Sin picante / poco picante'],['我对___过敏','Soy alérgico/a a ___'],['多少钱？','¿Cuánto cuesta?'],['请问车站/检票口在哪里？','¿Dónde está la estación / puerta?'],['请帮帮我','Por favor, ayúdeme']],
  trainRoutes:[
    { label:'6 sep · G5665', stations:[['Zhangjiajie West Railway Station','张家界西站'],['Furongzhen Railway Station','芙蓉镇站']] },
    { label:'7 sep · G3847', stations:[['Furongzhen Railway Station','芙蓉镇站'],['Fenghuang Gucheng Railway Station','凤凰古城站']] },
    { label:'8 sep · D3967', stations:[['Fenghuang Gucheng Railway Station','凤凰古城站'],['Guilin North Railway Station','桂林北站']] },
  ],
  tips:['Para los tres trenes, llega una hora antes; consulta puerta y andén en Trip.com.', 'Fenghuang y Longji requieren confirmar el transporte de última milla.', 'Confirma el peso/precio de pescado y marisco antes de cocinar.', 'Elige puestos concurridos, lleva pañuelos y pide 微辣 para poco picante en Hunan.'],
  emergency:['China: policía 110 · ambulancia 120 · bomberos 119','Indonesia: 112 donde esté disponible','Añade en notas los contactos de hotel/seguro; no se publican.'],
  currency:'Planificación aproximada del itinerario: 1 RMB ≈ €0,13 · 1 IDR ≈ €0,000049. Comprueba el cambio en vivo antes de gastar.'
};

export const APP_DATA = { days:DAYS, stays:STAYS, recommendations:RECOMMENDATIONS, kit:KIT, sources:SOURCES };
