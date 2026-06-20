export interface VocabularyItem {
  id: string;
  spanish: string;
  armenian: string;
  category: 'spatial' | 'time' | 'cafe' | 'verb_prep' | 'mood_state' | 'general';
  explanation: string;
}

export const VOCABULARY: VocabularyItem[] = [
  // --- 1. SPATIAL GEOMETRY / NAVIGATION (Game 1: La Brújula de Posición) ---
  {
    id: "v1",
    spanish: "al lado",
    armenian: "կողքին",
    category: "spatial",
    explanation: "«Al lado de algo» նշանակում է ինչ-որ բանի կողքին: Օրինակ՝ «El libro está al lado del lápiz»:"
  },
  {
    id: "v2",
    spanish: "a la derecha",
    armenian: "աջ կողմում",
    category: "spatial",
    explanation: "«A la derecha» օգտագործվում է աջ կողմը ցույց տալու համար: Եթե ավելացնում ենք ինչ-որ բանի նկատմամբ, դառնում է «a la derecha de»:"
  },
  {
    id: "v3",
    spanish: "a la izquierda",
    armenian: "ձախ կողմում",
    category: "spatial",
    explanation: "«A la izquierda» նշանակում է ձախ կողմում: Ինչ-որ բանի ձախ կողմում նշելիս կիրառվում է «a la izquierda de»:"
  },
  {
    id: "v4",
    spanish: "encima de",
    armenian: "վերևում / վրա",
    category: "spatial",
    explanation: "«Encima de» նշանակում է ինչ-որ բանի վրա (ֆիզիկական հպմամբ կամ հարթությունից վեր):"
  },
  {
    id: "v5",
    spanish: "debajo de",
    armenian: "տակ / ներքևում",
    category: "spatial",
    explanation: "«Debajo de» նշանակում է ինչ-որ բանի տակ (օրինակ՝ սեղանի տակ` «bajo la mesa» կամ «debajo de la mesa»):"
  },
  {
    id: "v6",
    spanish: "detrás de",
    armenian: "հետևում",
    category: "spatial",
    explanation: "«Detrás de» օգտագործվում է, երբ օբյեկտը գտնվում է մեկ այլ բանի հետևի մասում:"
  },
  {
    id: "v7",
    spanish: "delante de",
    armenian: "առջևում",
    category: "spatial",
    explanation: "«Delante de» նշանակում է դիմացի կողմում, առջևում (ֆիզիկական դիրք):"
  },
  {
    id: "v8",
    spanish: "enfrente de",
    armenian: "դիմացը",
    category: "spatial",
    explanation: "«Enfrente de» նշանակում է դեմ-դիմաց, հանդիպակաց կողմում (օրինակ՝ փողոցի այն կողմում` դիմացը):"
  },
  {
    id: "v9",
    spanish: "arriba",
    armenian: "վերևում",
    category: "spatial",
    explanation: "«Arriba»-ն մակբայ է, նշանակում է դեպի վեր կամ վերևում, չի պահանջում «de» նախդիրը անմիջապես իրենից հետո:"
  },
  {
    id: "v10",
    spanish: "abajo",
    armenian: "ներքևում",
    category: "spatial",
    explanation: "«Abajo» նշանակում է դեպի ցած կամ ներքևում: Ինչպես «arriba»-ն, այն ինքնուրույն է գործածվում:"
  },
  {
    id: "v11",
    spanish: "entre",
    armenian: "միջև",
    category: "spatial",
    explanation: "«Entre»-ն օգտագործվում է երկու կամ ավելի առարկաների/մարդկանց միջև դիրքը նշելու համար:"
  },
  {
    id: "v12",
    spanish: "alrededor de",
    armenian: "շուրջը",
    category: "spatial",
    explanation: "«Alrededor de» նշանակում է շրջանաձև դասավորվածություն ինչ-որ բանի շուրջը:"
  },
  {
    id: "v13",
    spanish: "dentro de",
    armenian: "ներսում",
    category: "spatial",
    explanation: "«Dentro de» նշանակում է տարածության ներսում (օրինակ՝ տուփի ներսում` «dentro de la caja»):"
  },
  {
    id: "v14",
    spanish: "a través de",
    armenian: "միջոցով / միջով",
    category: "spatial",
    explanation: "«A través de» նշանակում է պատնեշի կամ տարածության միջով անցնելով, կամ որևէ գործիքի միջոցով:"
  },
  {
    id: "v15",
    spanish: "seguir todo recto",
    armenian: "շարունակել ուղիղ",
    category: "spatial",
    explanation: "«Seguir todo recto» նշանակում է շարժվել անընդհատ ուղիղ ուղղությամբ` առանց շրջվելու:"
  },

  // --- 2. TIME / EVENTS (Game 3: El Laberinto de Tiempo) ---
  {
    id: "v16",
    spanish: "al mediodía",
    armenian: "կեսօրին",
    category: "time",
    explanation: "«Al mediodía» նշանակում է ցերեկվա ճիշտ 12:00-ին կամ կեսօրվա ժամերին:"
  },
  {
    id: "v17",
    spanish: "antes de",
    armenian: "առաջ",
    category: "time",
    explanation: "«Antes de»-ն ցույց է տալիս ժամանակային հաջորդականություն (մինչև որևէ իրադարձություն կամ ժամ):"
  },
  {
    id: "v18",
    spanish: "después de",
    armenian: "հետո",
    category: "time",
    explanation: "«Después de» նշանակում է որևէ իրադարձությունից կամ ժամանակից հետո:"
  },
  {
    id: "v19",
    spanish: "de vez en cuando",
    armenian: "ժամանակ առ ժամանակ",
    category: "time",
    explanation: "«De vez en cuando» դարձվածքը ցույց է տալիս հազվադեպ, բայց պարբերաբար կրկնվող գործողություն:"
  },
  {
    id: "v20",
    spanish: "a principios de",
    armenian: "ամսվա սկզբին",
    category: "time",
    explanation: "«A principios de»-ն օգտագործվում է ժամանակաշրջանի (օրինակ՝ ամսվա, տարվա) սկզբնական մասը նշելու համար:"
  },
  {
    id: "v21",
    spanish: "a finales de",
    armenian: "ամսվա վերջում",
    category: "time",
    explanation: "«A finales de» նշանակում է ժամանակաշրջանի վերջին օրերին կամ վերջնամասում (օրինակ՝ «a finales de junio»):"
  },
  {
    id: "v22",
    spanish: "desde hace",
    armenian: "արդեն ինչքան ժամանակ է",
    category: "time",
    explanation: "«Desde hace» օգտագործվում է ներկա ժամանակի հետ` ցույց տալու համար, թե որքան ժամանակ է, որ գործողությունը շարունակվում է:"
  },
  {
    id: "v23",
    spanish: "hasta ahora",
    armenian: "մինչ հիմա / հենց հիմա",
    category: "time",
    explanation: "«Hasta ahora» նշանակում է մինչև ներկա պահը կամ «առայժմ» հրաժեշտ տալիս:"
  },
  {
    id: "v24",
    spanish: "hasta luego",
    armenian: "մինչ հետո",
    category: "time",
    explanation: "«Hasta luego»-ն իսպաներենում ամենատարածված հրաժեշտի ձևերից է` «առայժմ, մինչ հանդիպում»:"
  },
  {
    id: "v25",
    spanish: "con antelación",
    armenian: "նախօրոք",
    category: "time",
    explanation: "«Con antelación» նշանակում է նախապես, ժամանակից առաջ (booking/նախապես պայմանավորվել):"
  },
  {
    id: "v26",
    spanish: "dentro de",
    armenian: "որոշ ժամանակից հետո",
    category: "time",
    explanation: "Երբ «dentro de» կիրառվում է ժամանակի հետ, այն նշանակում է «անց, հետո» (օրինակ՝ «dentro de dos días» - երկու օրից):"
  },
  {
    id: "v27",
    spanish: "desde",
    armenian: "սկսած / ի վեր",
    category: "time",
    explanation: "«Desde» նշանակում է գործողության մեկնարկային կետը` թե՛ տարածության, թե՛ ժամանակի մեջ (օրինակ՝ «desde el lunes»` երկուշաբթիից սկսած):"
  },
  {
    id: "v28",
    spanish: "hasta que",
    armenian: "մինչև որ",
    category: "time",
    explanation: "«Hasta que» միացնում է նախադասությունները` նշելով սահմանային պահը: Հաճախ պահանջում է Subjuntivo:"
  },
  {
    id: "v29",
    spanish: "hasta",
    armenian: "մինչև",
    category: "time",
    explanation: "«Hasta»-ն ցույց է տալիս ժամանակային կամ տարածական վերջնակետը («մինչև այստեղ»):"
  },
  {
    id: "v30",
    spanish: "cuanto antes",
    armenian: "որքան հնարավոր է շուտ",
    category: "time",
    explanation: "«Cuanto antes»-ը հորդորում է գործողությունն անել առավելագույն արագությամբ:"
  },

  // --- 3. FOOD / DINING (Game 4: La Cafetería del Menú) ---
  {
    id: "v31",
    spanish: "de primero",
    armenian: "որպես առաջին ուտեստ",
    category: "cafe",
    explanation: "Իսպանական ռեստորանում «de primero» պատվիրում են որպես առաջին ուտեստ (ապուր, աղցան):"
  },
  {
    id: "v32",
    spanish: "de segundo",
    armenian: "որպես հիմնական ուտեստ",
    category: "cafe",
    explanation: "«De segundo» պատվիրվում է երկրորդ` հիմնական տաք ուտեստը (միս, ձուկ):"
  },
  {
    id: "v33",
    spanish: "de postre",
    armenian: "որպես աղանդեր",
    category: "cafe",
    explanation: "«De postre» նշանակում է ճաշի վերջում մատուցվող քաղցրավենիքը, մրգերը կամ սուրճը:"
  },
  {
    id: "v34",
    spanish: "a la hora de",
    armenian: "ժամանակ / պահին",
    category: "cafe",
    explanation: "«A la hora de comer» նշանակում է ուտելու պահին / ուտելիս: Այս կառույցին հաջորդում է անորոշ դերբայը:"
  },

  // --- 4. VERB + PREPOSITION (Game 5: La Ruleta de Verbos) ---
  {
    id: "v35",
    spanish: "soñar con",
    armenian: "երազել ինչ-որ բանի մասին",
    category: "verb_prep",
    explanation: "Իսպաներենում «երազել ինչ-որ բանի մասին» թարգմանվում է «soñar con algo/alguien» (ոչ թե de կամ sobre):"
  },
  {
    id: "v36",
    spanish: "pensar en",
    armenian: "մտածել մի բանի մասին",
    category: "verb_prep",
    explanation: "«Մտածել ինչ-որ բանի մասին» իսպաներենում պահանջում է «en» նախդիրը՝ «pensar en algo»:"
  },
  {
    id: "v37",
    spanish: "dirigirse a",
    armenian: "դիմել մեկին",
    category: "verb_prep",
    explanation: "«Dirigirse a» նշանակում է ուղղվել կամ խոսքով դիմել որևէ մեկին:"
  },
  {
    id: "v38",
    spanish: "acercarse a",
    armenian: "մոտենալ",
    category: "verb_prep",
    explanation: "«Acercarse a algo/alguien» նշանակում է ֆիզիկապես կամ փոխաբերաբար մոտենալ սահմանին:"
  },
  {
    id: "v39",
    spanish: "acostumbrarse a",
    armenian: "վարժվել / սովորել",
    category: "verb_prep",
    explanation: "«Acostumbrarse a» նշանակում է սովորություն ձեռք բերել, հարմարվել նոր պայմաններին:"
  },
  {
    id: "v40",
    spanish: "dedicarse a",
    armenian: "նվիրվել / զբաղվել",
    category: "verb_prep",
    explanation: "«Dedicarse a» օգտագործվում է մասնագիտական գործունեությունը կամ զբաղմունքը նկարագրելիս («Es médico, se dedica a curar»):"
  },
  {
    id: "v41",
    spanish: "disfrazarse de",
    armenian: "զգեստավորվել որպես",
    category: "verb_prep",
    explanation: "«Disfrazarse de» նշանակում է դիմակահանդեսային զգեստ հագնել (օրինակ՝ կատվի զգեստ` «disfrazarse de gato»):"
  },
  {
    id: "v42",
    spanish: "enfadarse con",
    armenian: "բարկանալ մեկի վրա",
    category: "verb_prep",
    explanation: "«Enfadarse con alguien» նշանակում է ջղայնանալ կամ վիճել մեկի հետ (ոչ թե en կամ a):"
  },
  {
    id: "v43",
    spanish: "no fiarse de",
    armenian: "չվստահել",
    category: "verb_prep",
    explanation: "«No fiarse de alguien» նշանակում է կասկածանքով վերաբերվել, չապավինել մեկին:"
  },
  {
    id: "v44",
    spanish: "relacionarse con",
    armenian: "կապ ունենալ / հարաբերություն ունենալ",
    category: "verb_prep",
    explanation: "«Relacionarse con» նշանակում է շփվել, կապեր պահպանել կամ առնչվել այլ մարդկանց հետ:"
  },
  {
    id: "v45",
    spanish: "acordarse de",
    armenian: "հիշել",
    category: "verb_prep",
    explanation: "«Acordarse de algo» նշանակում է մտաբերել, հիշել: Զգուշացում. «recordar» բայը նախդիր չի պահանջում, բայց «acordarse»-ն պահանջում է «de»:"
  },
  {
    id: "v46",
    spanish: "servir para",
    armenian: "ծառայել ինչ-որ բանի համար",
    category: "verb_prep",
    explanation: "«Servir para» նշանակում է կիրառելի լինել որևէ նպատակի կամ գործառույթի համար («¿Para qué sirve esto?»):"
  },
  {
    id: "v47",
    spanish: "contar con",
    armenian: "հույս դնել / հաշվել մեկի վրա",
    category: "verb_prep",
    explanation: "«Contar con alguien» նշանակում է վստահել մեկին, նրա աջակցության վրա հույս ունենալ:"
  },
  {
    id: "v48",
    spanish: "entrar en",
    armenian: "մեջ մտնել",
    category: "verb_prep",
    explanation: "Ի տարբերություն անգլերենի (enter the room), իսպաներենում սենյակ կամ շենք մտնելիս ասում ենք՝ «entrar en la habitación»:"
  },
  {
    id: "v49",
    spanish: "tardar en",
    armenian: "ուշանալ / ժամանակ պահանջել",
    category: "verb_prep",
    explanation: "«Tardar en hacer algo» նշանակում է որոշակի ժամանակ վատնել կամ ուշանալ մի բան անելիս:"
  },

  // --- 5. EMOTIONS, MOODS & STATES (Game 6: El Desafío de los Estados) ---
  {
    id: "v50",
    spanish: "estar enamorado de",
    armenian: "սիրահարված լինել",
    category: "mood_state",
    explanation: "«Estar enamorado de alguien» նշանակում է ջերմորեն սիրահարված լինել մեկին (պահանջում է «de»):"
  },
  {
    id: "v51",
    spanish: "estar en paro",
    armenian: "գործազուրկ լինել",
    category: "mood_state",
    explanation: "«Estar en paro» նշանակում է չունենալ պաշտոնական աշխատանք, լինել գործազուրկ:"
  },
  {
    id: "v52",
    spanish: "estar de buen humor",
    armenian: "լավ տրամադրություն ունենալ",
    category: "mood_state",
    explanation: "«Estar de buen humor» նշանակում է ուրախ, դրական հոգեվիճակում գտնվել:"
  },
  {
    id: "v53",
    spanish: "estar de mal humor",
    armenian: "վատ տրամադրություն ունենալ",
    category: "mood_state",
    explanation: "«Estar de mal humor» նշանակում է ջղայնացած կամ տխուր լինել, վատ տրամադրությամբ:"
  },
  {
    id: "v54",
    spanish: "estar de paso",
    armenian: "ճանապարհին / անցողիկ լինել",
    category: "mood_state",
    explanation: "«Estar de paso» նշանակում է ժամանակավորապես գտնվել մի վայրում` ճանապարհորդության ընթացքում:"
  },
  {
    id: "v55",
    spanish: "estar de Erasmus",
    armenian: "Էրասմուսով լինել",
    category: "mood_state",
    explanation: "«Estar de Erasmus» նշանակում է մասնակցել եվրոպական ուսանողական փոխանակման ծրագրին:"
  },
  {
    id: "v56",
    spanish: "estar de compras",
    armenian: "գնումներ անելիս լինել",
    category: "mood_state",
    explanation: "«Estar de compras» նշանակում է խանութներով շրջել` գնումներ կատարելու նպատակով:"
  },
  {
    id: "v57",
    spanish: "estar acostumbrado a",
    armenian: "սովոր լինել",
    category: "mood_state",
    explanation: "«Estar acostumbrado a algo» նշանակում է սովոր լինել կամ հարմարված լինել որևէ իրավիճակի:"
  },
  {
    id: "v58",
    spanish: "estar listo para",
    armenian: "պատրաստ լինել",
    category: "mood_state",
    explanation: "«Estar listo para algo» նշանակում է լիովին պատրաստ լինել գործողություն սկսելու կամ որևէ իրադարձության:"
  },
  {
    id: "v59",
    spanish: "tener cuidado con",
    armenian: "զգույշ լինել",
    category: "mood_state",
    explanation: "«Tener cuidado con algo» նշանակում է զգուշություն ցուցաբերել վտանգավոր կամ նուրբ առարկայի/կենդանու նկատմամբ:"
  },
  {
    id: "v60",
    spanish: "hacer daño",
    armenian: "ցավ պատճառել",
    category: "mood_state",
    explanation: "«Hacer daño» նշանակում է ֆիզիկական կամ հոգեբանական ցավ պատճառել, վնասել:"
  },
  {
    id: "v61",
    spanish: "no tener ni idea de",
    armenian: "գաղափար չունենալ ինչ-որ բանից",
    category: "mood_state",
    explanation: "«No tener ni idea de algo» ժարգոնային, բայց շատ գործածական արտահայտություն է` «ընդհանրապես տեղեկացված չլինել»:"
  },

  // --- 6. PHRASE CONNECTORS BOARD (Game 2: El Puente de Conectores) ---
  {
    id: "v62",
    spanish: "con destino a",
    armenian: "դեպի նպատակակետ",
    category: "general",
    explanation: "«Con destino a» օգտագործվում է ճանապարհորդության մեջ` նշելով վերջնակետը (օրինակ՝ «un vuelo con destino a Madrid»):"
  },
  {
    id: "v63",
    spanish: "a gusto",
    armenian: "հարմար / լավ զգալ",
    category: "general",
    explanation: "«Sentirse a gusto» նշանակում է հարմարավետ զգալ հասարակության մեջ կամ միջավայրում:"
  },
  {
    id: "v64",
    spanish: "a pie",
    armenian: "ոտքով",
    category: "general",
    explanation: "«Ir a pie» նշանակում է քայլելով գնալ (ոտքով)` առանց տրանսպորտի:"
  },
  {
    id: "v65",
    spanish: "por cierto",
    armenian: "ի դեպ",
    category: "general",
    explanation: "«Por cierto» կիրառվում է խոսակցության մեջ նոր, բայց առնչվող միտք անցողիկ հայտնելու համար:"
  },
  {
    id: "v66",
    spanish: "en absoluto",
    armenian: "ընդհանրապես ոչ",
    category: "general",
    explanation: "«En absoluto» նշանակում է կատարյալ հերքում (ընդհանրապես ոչ, բնավ, երբեք):"
  },
  {
    id: "v67",
    spanish: "en caso de que",
    armenian: "եթե / այն դեպքում, երբ",
    category: "general",
    explanation: "«En caso de que» կառույցից հետո միշտ պահանջվում է Subjuntivo կայացած քերականական կանոնով:"
  },
  {
    id: "v68",
    spanish: "al principio",
    armenian: "սկզբում",
    category: "general",
    explanation: "«Al principio» նշանակում է գործընթացի կամ պատմության սկզբնական փուլում:"
  },
  {
    id: "v69",
    spanish: "en vez de",
    armenian: "փոխարենը",
    category: "general",
    explanation: "«En vez de» նշանակում է այլընտրանքի ընտրություն՝ մեկ այլ տարբերակի փոխարեն:"
  },
  {
    id: "v70",
    spanish: "como máximo",
    armenian: "առավելագույնը",
    category: "general",
    explanation: "«Como máximo» սահմանում է վերին թույլատրելի շեմը:"
  },
  {
    id: "v71",
    spanish: "como mínimo",
    armenian: "նվազագույնը",
    category: "general",
    explanation: "«Como mínimo» սահմանում է ստորին անհրաժեշտ շեմը:"
  },
  {
    id: "v72",
    spanish: "conmigo / contigo", 
    armenian: "ինձ հետ / քեզ հետ",
    category: "general",
    explanation: "«Conmigo» նշանակում է ինձ հետ, «contigo»՝ քեզ հետ: Սրանք միաձուլված հատուկ դերանվանական ձևեր են:"
  },
  {
    id: "v73",
    spanish: "en esta zona",
    armenian: "այս շրջանում / այս կողմերում",
    category: "general",
    explanation: "«En esta zona» նշանակում է տվյալ աշխարհագրական կամ քաղաքային թաղամասի սահմաններում:"
  },
  {
    id: "v74",
    spanish: "de todos modos",
    armenian: "ամեն դեպքում",
    category: "general",
    explanation: "«De todos modos» օգտագործվում է որոշումը կամ իրողությունը վերահաստատելու համար` անկախ հանգամանքներից:"
  },
  {
    id: "v75",
    spanish: "en / a casa de",
    armenian: "տանը / մեկի տանը",
    category: "general",
    explanation: "«En casa de María» նշանակում է Մարիայի տանը: «Ir a casa de María»` գնալ Մարիայի տուն:"
  },
  {
    id: "v76",
    spanish: "seguir + gerundio",
    armenian: "շարունակել անել",
    category: "general",
    explanation: "«Seguir + gerundio» (դերբայ) նշանակում է շարունակել որևէ գործողություն անել (օրինակ՝ «sigo estudiando» - շարունակում եմ սովորել):"
  },
  {
    id: "v77",
    spanish: "primero",
    armenian: "նախ",
    category: "general",
    explanation: "«Primero» նշանակում է առաջին հերթին, նախքան մյուս գործողություններին անցնելը:"
  },
  {
    id: "v78",
    spanish: "de acuerdo",
    armenian: "համաձայն / լավ",
    category: "general",
    explanation: "«De acuerdo»-ն իսպաներենում համաձայնություն արտահայտելու ամենատարածված ձևն է:"
  },
  {
    id: "v79",
    spanish: "de piel",
    armenian: "կաշվե",
    category: "general",
    explanation: "«De piel» օգտագործվում է որպես նյութի նկարագրություն, օրինակ՝ կաշվե բաճկոն` «una chaqueta de piel»:"
  },
  {
    id: "v80",
    spanish: "en pleno invierno",
    armenian: "ձմռան կեսին",
    category: "general",
    explanation: "«En pleno invierno» նշանակում է ձմռան ամենախիստ, ամենաթեժ պահին (կովկասյան կամ պիրենեյան ձմռան կենտրոնում):"
  },
  {
    id: "v81",
    spanish: "además",
    armenian: "բացի այդ",
    category: "general",
    explanation: "«Además» շաղկապը կիրառվում է նախորդ մտքին նոր փաստարկ կամ տեղեկատվություն հավելելիս:"
  },
  {
    id: "v82",
    spanish: "en realidad",
    armenian: "իրականում",
    category: "general",
    explanation: "«En realidad» նշանակում է փաստացիորեն, իրականում (ի հակադրություն պատրանքի կամ սպասումների):"
  },
  {
    id: "v83",
    spanish: "todavía",
    armenian: "դեռ",
    category: "general",
    explanation: "«Todavía» նշանակում է դեռևս (օրինակ՝ «todavía sigo esperando» - դեռ սպասում եմ):"
  },
  {
    id: "v84",
    spanish: "por fin",
    armenian: "վերջապես",
    category: "general",
    explanation: "«Por fin» արտահայտում է երկար սպասված իրադարձության իրականացման բերկրանքը («¡Por fin termine!»):"
  },
  {
    id: "v85",
    spanish: "juntos / juntas",
    armenian: "միասին",
    category: "general",
    explanation: "«Juntos» (արական/խառը խումբ) կամ «juntas» (իգական խումբ) նշանակում է համատեղ, միասին իրականացվող:"
  },
  {
    id: "v86",
    spanish: "ser de",
    armenian: "պատկանել / լինել ծագումով",
    category: "general",
    explanation: "«Ser de» նշանակում է որևէ տեղից լինել (ծագում) կամ պատկանել ինչ-որ մեկին (սեփականություն):"
  },
  {
    id: "v87",
    spanish: "dar una vuelta por",
    armenian: "զբոսնել / պտտվել",
    category: "general",
    explanation: "«Dar una vuelta por el barrio» նշանակում է զբոսնել, փոքրիկ պտույտ կատարել թաղամասով:"
  },
  {
    id: "v88",
    spanish: "ahí",
    armenian: "այնտեղ / ահա այնտեղ",
    category: "general",
    explanation: "«Ahí» ցույց է տալիս խոսակիցին մոտ գտնվող վայրը (չափավոր հեռավորություն):"
  },
  {
    id: "v89",
    spanish: "allí / allá",
    armenian: "այնտեղ / այն կողմ",
    category: "general",
    explanation: "«Allí»-ն կամ «allá»-ն ցույց է տալիս երկու խոսակիցներից էլ շատ հեռու գտնվող վայրը («այնտեղ` հեռվում»):"
  },
  {
    id: "v90",
    spanish: "sobre todo",
    armenian: "հատկապես",
    category: "general",
    explanation: "«Sobre todo»-ն նշանակում է առավելապես, հատկապես (չշփոթել `sobretodo` վերարկու բառի հետ):"
  },
  {
    id: "v91",
    spanish: "por teléfono",
    armenian: "հեռախոսով",
    category: "general",
    explanation: "Հաղորդակցման միջոցները իսպաներենում պահանջում են «por» նախդիրը («hablar por teléfono»):"
  },
  {
    id: "v92",
    spanish: "hacia",
    armenian: "դեպի / մոտավորապես",
    category: "general",
    explanation: "«Hacia»-ն ցույց է տալիս շարժման ուղղությունը դեպի ինչ-որ տեղ կամ մոտավոր ժամանակ («hacia las tres» - ժամը երեքի կողմերը):"
  },
  {
    id: "v93",
    spanish: "para mí / para ti",
    armenian: "քո կարծիքով / ինձ համար",
    category: "general",
    explanation: "«Para mí» - ըստ իս, իմ կարծիքով կամ ինձ համար: «Para ti» - քո կարծիքով կամ քեզ համար:"
  },
  {
    id: "v94",
    spanish: "por",
    armenian: "պատճառով / համար",
    category: "general",
    explanation: "«Por» նախդիրը ցույց է տալիս պատճառը, ժամանակահատվածը, փոխանակումը, տարածությունը կամ միջոցը:"
  },
  {
    id: "v95",
    spanish: "para",
    armenian: "նպատակով / համար",
    category: "general",
    explanation: "«Para» նախդիրը ցույց է տալիս նպատակակետը, վերջնաժամկետը, ստացողին կամ կարծիքը:"
  }
];
