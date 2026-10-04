import { GoalCategoryId, TimelineOption, ExperienceLevel } from '@/types/growth';

export interface TranslationSchema {
  brand: {
    name: string;
    tagline: string;
    badge: string;
  };
  navigation: {
    steps: {
      id: number;
      num: string;
      label: string;
      shortDesc: string;
    }[];
  };
  screenDefine: {
    kicker: string;
    title: string;
    reassurance: string;
    goalsLabel: string;
    goalsHelp: string;
    goals: Record<GoalCategoryId, { title: string; subtitle: string; icon: string }>;
    objectiveLabel: string;
    objectiveHelp: string;
    objectivePlaceholder: string;
    quickPromptsLabel: string;
    quickPrompts: string[];
    timelineLabel: string;
    timelineHelp: string;
    timelineOptions: Record<TimelineOption, { label: string; desc: string }>;
    experienceLabel: string;
    experienceHelp: string;
    experienceOptions: Record<ExperienceLevel, { label: string; desc: string }>;
    alpacaGuidance: {
      coachName: string;
      quote: string;
      tip: string;
      whyImportantTitle: string;
      whyImportantBody: string;
    };
    cta: string;
    ctaHint: string;
    validationWarning: string;
  };
  screenDiagnose: {
    kicker: string;
    headline: string;
    supportingText: string;
    alpacaMessage: string;
    coachName: string;
    q1: {
      title: string;
      helper: string;
      placeholder: string;
      chipsLabel: string;
      chips: string[];
    };
    q2: {
      title: string;
      helper: string;
      options: Record<import('@/types/growth').CurrentAssetId, string>;
    };
    q3: {
      title: string;
      helper: string;
      options: Record<import('@/types/growth').MainChallengeId, string>;
    };
    q4: {
      title: string;
      helper: string;
      options: Record<ExperienceLevel, { label: string; desc: string }>;
    };
    otherFieldLabel: string;
    otherPlaceholder: string;
    aiPreview: {
      badge: string;
      title: string;
      text: string;
      notice: string;
    };
    primaryCta: string;
    secondaryAction: string;
    requiredHint: string;
  };
  screenTransitionLearn: {
    badge: string;
    title: string;
    subtitle: string;
    previewCardTitle: string;
    nextTitle: string;
    nextSteps: string[];
    backDiagnose: string;
    backDefine: string;
  };
  screenLearn: {
    kicker: string;
    headline: string;
    supportingText: string;
    alpacaMessage: string;
    coachName: string;
    startingPoint: {
      title: string;
      projectType: string;
      objective: string;
      audience: string;
      mainDifficulty: string;
      marketingExperience: string;
      unspecified: string;
    };
    conceptCard: {
      sectionLabel: string;
      conceptName: string;
      conceptDesc: string;
      blocks: {
        problem: { title: string; desc: string };
        value: { title: string; desc: string };
        differentiation: { title: string; desc: string };
      };
    };
    exampleCard: {
      title: string;
      badge: string;
      problemLabel: string;
      problemText: string;
      valueLabel: string;
      valueText: string;
      differentiationLabel: string;
      differentiationText: string;
    };
    exercise: {
      badge: string;
      title: string;
      question: string;
      options: {
        A: string;
        B: string;
        C: string;
      };
      feedbackCorrect: string;
      feedbackIncorrect: string;
      retryHint: string;
      continueHint: string;
    };
    primaryCta: string;
    secondaryAction: string;
    ctaDisabledHint: string;
  };
  screenBuild: {
    kicker: string;
    headline: string;
    supportingText: string;
    alpacaMessage: string;
    coachName: string;
    mainTitle: string;
    step1: {
      title: string;
      helper: string;
      placeholder: string;
    };
    step2: {
      title: string;
      helper: string;
      placeholder: string;
    };
    step3: {
      title: string;
      helper: string;
      placeholder: string;
    };
    aiCoachPanel: {
      title: string;
      draftBadge: string;
      proposalText: string;
      alternateProposals: string[];
      useProposalBtn: string;
      editBtn: string;
      createAnotherBtn: string;
      transparencyNote: string;
    };
    resultCard: {
      title: string;
      problemLabel: string;
      personaLabel: string;
      valueLabel: string;
      valuePropLabel: string;
      emptyPlaceholder: string;
    };
    primaryCta: string;
    secondaryAction: string;
    fillFieldsHint: string;
  };
  screenExperiment: {
    kicker: string;
    headline: string;
    supportingText: string;
    alpacaMessage: string;
    coachName: string;
    cardTitle: string;
    fields: {
      objective: { label: string; placeholder: string };
      hypothesis: { label: string; helper: string; placeholder: string };
      channel: { 
        label: string; 
        options: Record<import('@/types/growth').ExperimentChannel, string>; 
      };
      message: { label: string; placeholder: string };
      cta: { label: string; placeholder: string };
      kpi: { 
        label: string; 
        options: Record<import('@/types/growth').ExperimentKpi, string>; 
      };
      baseline: { label: string; placeholder: string };
      duration: { 
        label: string; 
        options: Record<import('@/types/growth').ExperimentDuration, string>; 
      };
    };
    aiValidation: {
      title: string;
      badge: string;
      reviewText: string;
      transparency: string;
    };
    primaryCta: string;
    secondaryAction: string;
    validationHint: string;
  };
  screenExecute: {
    kicker: string;
    headline: string;
    supportingText: string;
    alpacaMessage: string;
    coachName: string;
    flowTitle: string;
    flowSteps: string[];
    assetPreview: {
      title: string;
      fictionalBadge: string;
      headlineLabel: string;
      headlineText: string;
      bodyLabel: string;
      bodyText: string;
      ctaLabel: string;
      ctaText: string;
      formatLabel: string;
      formatText: string;
    };
    canvaHandoff: {
      title: string;
      desc: string;
      buttonText: string;
      prototypeNotice: string;
    };
    checklist: {
      title: string;
      items: string[];
    };
    primaryCta: string;
    secondaryAction: string;
  };
  screenImprove: {
    kicker: string;
    headline: string;
    supportingText: string;
    alpacaMessage: string;
    coachName: string;
    form: {
      title: string;
      realDataNote: string;
      impressions: string;
      clicks: string;
      signups: string;
      engagement: string;
      conversions: string;
      notes: string;
      analyzeButton: string;
      analyzingText: string;
    };
    aiInsights: {
      title: string;
      demoBadge: string;
      confidenceIndicator: string;
      sections: {
        worked: { label: string; title: string; text: string };
        didNotWork: { label: string; title: string; text: string };
        evidence: { label: string; title: string; text: string };
        nextAction: { label: string; title: string; text: string };
      };
    };
    nextExperimentCard: {
      title: string;
      text: string;
    };
    loopVisual: {
      title: string;
      centerText: string;
      steps: string[];
    };
    finalProductMessage: {
      title: string;
      quote: string;
    };
    primaryCta: string;
    secondaryCta: string;
    savedToast: string;
  };
  screenBuildTransition?: {
    badge: string;
    title: string;
    subtitle: string;
    summaryTitle: string;
    nextSteps: string[];
    backToLearn: string;
  };
}

export const translations: Record<'es' | 'pt', TranslationSchema> = {
  es: {
    brand: {
      name: 'AI Growth Coach',
      tagline: 'Aprende. Haz. Mejora.',
      badge: 'Guía de Marketing con IA',
    },
    navigation: {
      steps: [
        { id: 1, num: '01', label: 'Definir', shortDesc: 'Meta & Enfoque' },
        { id: 2, num: '02', label: 'Diagnosticar', shortDesc: 'Oportunidades' },
        { id: 3, num: '03', label: 'Aprender', shortDesc: 'Conceptos clave' },
        { id: 4, num: '04', label: 'Construir', shortDesc: 'Activos de marketing' },
        { id: 5, num: '05', label: 'Experimentar', shortDesc: 'Pruebas rápidas' },
        { id: 6, num: '06', label: 'Ejecutar', shortDesc: 'Lanzamiento' },
        { id: 7, num: '07', label: 'Mejorar', shortDesc: 'Optimización' },
      ],
    },
    screenDefine: {
      kicker: 'Paso 01 · Fundamentos',
      title: '¿Qué quieres hacer crecer?',
      reassurance: 'Empieza con tu objetivo. Nosotros te guiaremos en el resto.',
      goalsLabel: 'Selecciona lo que mejor describe tu proyecto:',
      goalsHelp: 'Esto adaptará el lenguaje y las tácticas de IA recomendadas.',
      goals: {
        product: {
          icon: 'Rocket',
          title: 'Un producto',
          subtitle: 'Software, app móvil, producto físico o solución digital.',
        },
        community: {
          icon: 'Users',
          title: 'Una comunidad',
          subtitle: 'Grupo de miembros, red temática o comunidad de valor.',
        },
        course: {
          icon: 'BookOpen',
          title: 'Un curso',
          subtitle: 'Taller, academia online o programa de mentoría práctica.',
        },
        business: {
          icon: 'Briefcase',
          title: 'Un negocio',
          subtitle: 'Comercio local, consultoría, agencia o pyme en expansión.',
        },
        brand: {
          icon: 'PenTool',
          title: 'Una marca personal',
          subtitle: 'Creador, profesional independiente o referente del sector.',
        },
        education: {
          icon: 'GraduationCap',
          title: 'Un proyecto educativo',
          subtitle: 'Divulgación, podcast, boletín o iniciativa formativa.',
        },
      },
      objectiveLabel: '¿Qué quieres lograr?',
      objectiveHelp: 'Escríbelo con tus propias palabras; la IA te ayudará a pulirlo en el siguiente paso.',
      objectivePlaceholder: 'Ejemplo: Conseguir mis primeros 50 clientes que paguen, o lanzar una lista de espera con 200 personas interesadas...',
      quickPromptsLabel: '¿Necesitas inspiración? Toca una para empezar:',
      quickPrompts: [
        'Conseguir mis primeros 50 clientes de pago',
        'Validar una oferta y construir una lista de espera de 200 personas',
        'Aumentar mis ventas mensuales un 30% en mi nicho',
      ],
      timelineLabel: '¿Cuándo quieres lograrlo?',
      timelineHelp: 'Definir el horizonte ayuda a calibrar la intensidad de las acciones.',
      timelineOptions: {
        '7d': {
          label: '7 días',
          desc: 'Sprint rápido de validación y primeros contactos',
        },
        '30d': {
          label: '30 días',
          desc: 'Plan mensual equilibrado de lanzamiento y tracción',
        },
        '90d': {
          label: '90 días',
          desc: 'Estrategia completa de posicionamiento y escala',
        },
      },
      experienceLabel: '¿Cuánta experiencia tienes con Marketing?',
      experienceHelp: 'Ajustamos las explicaciones y las herramientas para que nunca te sientas abrumado.',
      experienceOptions: {
        beginner: {
          label: 'Estoy empezando',
          desc: 'Todo es nuevo para mí. Prefiero pasos guiados sin términos complejos.',
        },
        basics: {
          label: 'Conozco lo básico',
          desc: 'Entiendo conceptos como cliente ideal, pero necesito un método estructurado.',
        },
        experienced: {
          label: 'Tengo experiencia',
          desc: 'Ya he ejecutado campañas antes y quiero acelerar resultados con IA.',
        },
      },
      alpacaGuidance: {
        coachName: 'Alfi · Tu Coach Alpaca',
        quote: 'No te preocupes. No necesitas saber la respuesta a todo. Lo resolveremos juntos paso a paso.',
        tip: 'La mayoría de los proyectos exitosos comenzaron con una meta simple. El secreto es dividirla en acciones diarias guiadas por IA.',
        whyImportantTitle: '¿Por qué empezamos por aquí?',
        whyImportantBody: 'Un objetivo claro le permite a la IA generar copys, audiencias y tácticas que realmente resuenen con tus futuros clientes.',
      },
      cta: 'Continuar al Diagnóstico',
      ctaHint: 'Guardaremos tus elecciones y pasaremos al Paso 02.',
      validationWarning: 'Por favor selecciona qué quieres hacer crecer y escribe brevemente tu objetivo.',
    },
    screenDiagnose: {
      kicker: 'Paso 02 · Diagnóstico',
      headline: 'Ahora entendamos dónde estás.',
      supportingText: 'No necesitas tener todas las respuestas. Te haré unas pocas preguntas para encontrar el mejor punto de partida.',
      alpacaMessage: 'Vamos paso a paso. No necesitas saber Marketing para empezar.',
      coachName: 'Alfi · Tu Coach de Crecimiento',
      q1: {
        title: '¿A quién quieres llegar?',
        helper: 'Describe a la persona, grupo o tipo de cliente que quieres atraer.',
        placeholder: 'Ej: Dueños de cafeterías locales, diseñadores freelance, o personas que buscan aprender finanzas...',
        chipsLabel: '¿Ideas para inspirarte? Toca para probar:',
        chips: [
          'Clientes o usuarios finales',
          'Pequeños negocios o empresas B2B',
          'Profesionales independientes',
        ],
      },
      q2: {
        title: '¿Qué tienes actualmente?',
        helper: 'Selecciona todas las opciones que apliquen (puedes marcar varias):',
        options: {
          no_audience: 'Sin audiencia todavía',
          social_media: 'Redes sociales',
          community: 'Comunidad',
          newsletter: 'Newsletter / lista',
          clients: 'Clientes o usuarios',
          course_product: 'Curso / producto',
          other: 'Otro',
        },
      },
      q3: {
        title: '¿Cuál es tu principal dificultad?',
        helper: 'Elige solo una dificultad principal para definir tu prioridad:',
        options: {
          target_audience: 'No sé a quién dirigirme',
          differentiation: 'No sé cómo diferenciar mi propuesta',
          attract: 'No sé cómo atraer personas',
          engagement: 'Las personas llegan pero no participan',
          content_creation: 'No sé qué contenido crear',
          metrics: 'No sé cómo medir resultados',
          what_to_change: 'Tengo resultados, pero no sé qué cambiar',
          other: 'Otro',
        },
      },
      q4: {
        title: '¿Qué tan familiarizado estás con Marketing?',
        helper: 'Ajustamos las explicaciones y herramientas para que nunca te sientas abrumado:',
        options: {
          beginner: {
            label: 'Estoy empezando',
            desc: 'Todo es nuevo para mí. Prefiero explicaciones simples paso a paso.',
          },
          basics: {
            label: 'Conozco lo básico',
            desc: 'Entiendo conceptos como cliente ideal, pero necesito una estructura clara.',
          },
          experienced: {
            label: 'Tengo experiencia',
            desc: 'Ya he ejecutado campañas antes y quiero acelerar con IA.',
          },
        },
      },
      otherFieldLabel: 'Especifica tu opción:',
      otherPlaceholder: 'Escribe tu respuesta aquí...',
      aiPreview: {
        badge: 'Próximo paso',
        title: 'Tu coach analizará esto',
        text: 'Con tus respuestas identificaré tu etapa de Growth, tu principal cuello de botella y el siguiente concepto que necesitas aprender.',
        notice: 'Vista previa conceptual · No inventamos resultados ficticios antes de tiempo.',
      },
      primaryCta: 'Encontrar mi punto de partida',
      secondaryAction: 'Volver',
      requiredHint: 'Completa tu público objetivo, al menos 1 opción actual y tu dificultad principal para continuar.',
    },
    screenTransitionLearn: {
      badge: 'Paso 03 · Transición a Aprender',
      title: '¡Diagnóstico listo! Tu punto de partida está definido',
      subtitle: 'Tu coach Alfi ha estructurado tus respuestas para preparar tus lecciones personalizadas con IA.',
      previewCardTitle: 'Estructura conceptual lista para tu IA (Context Schema)',
      nextTitle: 'Qué desbloquearás en el Paso 03: Aprender',
      nextSteps: [
        'Lección interactiva enfocada en tu dificultad principal',
        'Modelos de prompts de IA adaptados a tu nivel de experiencia',
        'Primer experimento práctico sin teoría innecesaria',
      ],
      backDiagnose: 'Modificar diagnóstico',
      backDefine: 'Volver a 01 Definir',
    },
    screenLearn: {
      kicker: 'Paso 03 · Aprender',
      headline: 'Aprende lo que necesitas para avanzar.',
      supportingText: 'No necesitas convertirte en experto en Marketing. Vamos a aprender justo lo necesario para tomar tu próxima decisión.',
      alpacaMessage: 'Te prometo que hoy no vamos a leer un manual de 400 páginas.',
      coachName: 'Alfi · Tu Coach de Crecimiento',
      startingPoint: {
        title: 'Tu punto de partida',
        projectType: 'Tipo de proyecto',
        objective: 'Objetivo',
        audience: 'Público objetivo',
        mainDifficulty: 'Dificultad principal',
        marketingExperience: 'Experiencia en Marketing',
        unspecified: 'Aún no especificado',
      },
      conceptCard: {
        sectionLabel: 'CONCEPTO CLAVE',
        conceptName: 'Propuesta de valor',
        conceptDesc: 'Tu propuesta de valor explica por qué alguien debería elegir tu producto, servicio, comunidad o proyecto en lugar de otra alternativa.',
        blocks: {
          problem: {
            title: 'Problema',
            desc: 'El dolor o necesidad real que vive tu cliente potencial.',
          },
          value: {
            title: 'Valor',
            desc: 'El alivio o transformación concreta que tú le entregas.',
          },
          differentiation: {
            title: 'Diferenciación',
            desc: 'Por qué tu solución es única o preferible a las alternativas.',
          },
        },
      },
      exampleCard: {
        title: 'Ejemplo realista',
        badge: 'Caso práctico',
        problemLabel: 'Problema',
        problemText: 'No sé dónde aprender Marketing sin perderme entre cientos de cursos.',
        valueLabel: 'Valor',
        valueText: 'Aprendizaje práctico guiado por IA.',
        differentiationLabel: 'Diferenciación',
        differentiationText: 'Aprendes mientras aplicas.',
      },
      exercise: {
        badge: 'Mini ejercicio',
        title: 'Pruébalo tú',
        question: '¿Cuál de estas frases comunica mejor una propuesta de valor?',
        options: {
          A: 'Tenemos una comunidad de Marketing.',
          B: 'Aprende Marketing haciendo tu primera campaña con acompañamiento de IA.',
          C: 'Somos una plataforma digital innovadora.',
        },
        feedbackCorrect: '¡Exacto! Una buena propuesta de valor deja claro qué problema resuelves y qué hace diferente tu solución.',
        feedbackIncorrect: 'Casi. Busca la opción que explique mejor el valor que recibe la persona y no solamente lo que ofrece la empresa.',
        retryHint: 'Prueba seleccionando otra opción para notar el contraste.',
        continueHint: '¡Excelente razonamiento! Has comprendido el núcleo de la propuesta de valor.',
      },
      primaryCta: 'Ya entendí. Vamos a construir',
      secondaryAction: 'Volver',
      ctaDisabledHint: 'Elige una respuesta en el mini ejercicio para continuar.',
    },
    screenBuild: {
      kicker: 'Paso 04 · Construir',
      headline: 'Ahora vamos a construirlo juntos.',
      supportingText: 'Tu idea no necesita estar perfecta. La vamos a convertir en una primera versión que puedas probar.',
      alpacaMessage: 'Yo te ayudo a ordenar las ideas. La decisión final sigue siendo tuya.',
      coachName: 'Alfi · Tu Coach de Crecimiento',
      mainTitle: 'Construyamos tu propuesta de valor',
      step1: {
        title: '¿Qué problema quieres resolver?',
        helper: 'Descríbelo con tus propias palabras. No necesitas utilizar lenguaje de Marketing.',
        placeholder: 'Ej.: Las personas quieren aprender IA, pero no saben por dónde empezar.',
      },
      step2: {
        title: '¿Para quién estás resolviendo este problema?',
        helper: 'Define con precisión quién es tu usuario o cliente ideal.',
        placeholder: 'Ej.: Profesionales que quieren aplicar IA en su trabajo.',
      },
      step3: {
        title: '¿Qué cambio quieres conseguir para esa persona?',
        helper: 'Describe la transformación o el alivio concreto que experimenta.',
        placeholder: 'Ej.: Que pueda aplicar IA en una tarea real de su trabajo.',
      },
      aiCoachPanel: {
        title: 'Tu coach propone',
        draftBadge: 'Borrador generado por IA',
        proposalText: 'Para profesionales que quieren aplicar IA en su trabajo, AI Growth Coach ayuda a convertir una idea en una acción concreta, enseñando qué hacer, cómo probarlo y cómo medir el resultado.',
        alternateProposals: [
          'Para profesionales que quieren aplicar IA en su trabajo, ayudamos a diseñar y ejecutar su primera campaña con IA en menos de 7 días, sin teoría aburrida.',
          'Para creadores y pequeños negocios, convertimos objetivos de crecimiento en experimentos prácticos guiados paso a paso con IA.',
        ],
        useProposalBtn: 'Usar propuesta',
        editBtn: 'Editar',
        createAnotherBtn: 'Crear otra',
        transparencyNote: 'La IA propone. Tú decides.',
      },
      resultCard: {
        title: 'Resultado de este paso',
        problemLabel: 'Problema',
        personaLabel: 'Persona',
        valueLabel: 'Valor',
        valuePropLabel: 'Propuesta de valor',
        emptyPlaceholder: 'Por completar...',
      },
      primaryCta: 'Convertir en experimento',
      secondaryAction: 'Volver',
      fillFieldsHint: 'Completa los 3 campos o adopta la propuesta del coach para continuar.',
    },
    screenExperiment: {
      kicker: 'Paso 05 · Experimentar',
      headline: 'Convirtamos la idea en una hipótesis.',
      supportingText: 'No vamos a adivinar. Vamos a probar algo concreto y medir qué sucede.',
      alpacaMessage: '¡Ahora sí! Tenemos algo que aprender del mundo real.',
      coachName: 'Alfi · Tu Coach de Crecimiento',
      cardTitle: 'Ficha del Experimento',
      fields: {
        objective: {
          label: 'OBJETIVO',
          placeholder: '¿Qué quieres conseguir? Ej: Conseguir 20 usuarios interesados en 7 días.',
        },
        hypothesis: {
          label: 'HIPÓTESIS',
          helper: 'Fórmula: Si hacemos X, esperamos conseguir Y porque Z.',
          placeholder: 'Si publicamos una guía práctica de IA en LinkedIn, esperamos conseguir 30 registros porque resuelve la duda más común de nuestro público.',
        },
        channel: {
          label: 'CANAL / MEDIO',
          options: {
            linkedin: 'LinkedIn',
            instagram: 'Instagram',
            email: 'Email / Newsletter',
            community: 'Comunidad',
            website: 'Sitio Web',
            other: 'Otro canal',
          },
        },
        message: {
          label: 'MENSAJE / GANCHO',
          placeholder: 'El titular o gancho que verá tu cliente potencial...',
        },
        cta: {
          label: 'LLAMADA A LA ACCIÓN (CTA)',
          placeholder: 'Ej: Haz clic aquí para descargar la plantilla gratis',
        },
        kpi: {
          label: 'KPI PRINCIPAL',
          options: {
            reach: 'Alcance / Impresiones',
            clicks: 'Clics en enlace',
            signups: 'Registros / Suscripciones',
            engagement: 'Participación / Respuestas',
            conversions: 'Conversiones a clientes',
          },
        },
        baseline: {
          label: 'LÍNEA BASE (VALOR ACTUAL)',
          placeholder: '0',
        },
        duration: {
          label: 'DURACIÓN',
          options: {
            '7d': '7 días (Sprint)',
            '14d': '14 días (Estándar)',
            '30d': '30 días (Mes completo)',
          },
        },
      },
      aiValidation: {
        title: 'Revisión de tu coach',
        badge: 'Listo para probar',
        reviewText: 'Tu hipótesis es clara, el canal está definido y ya tienes una métrica para evaluar el resultado.',
        transparency: 'La IA evalúa la coherencia del experimento. Tú decides si ejecutarlo.',
      },
      primaryCta: 'Preparar ejecución',
      secondaryAction: 'Volver',
      validationHint: 'Completa al menos el objetivo y la hipótesis para preparar la ejecución.',
    },
    screenExecute: {
      kicker: 'Paso 06 · Ejecutar',
      headline: 'Llévalo al mundo real.',
      supportingText: 'Ya tienes la estrategia. Ahora conviértela en una pieza que puedas publicar, compartir o probar.',
      alpacaMessage: 'Menos perfección. Más pruebas.',
      coachName: 'Alfi · Tu Coach de Crecimiento',
      flowTitle: 'Flujo de materialización',
      flowSteps: ['OBJETIVO', 'MENSAJE', 'FORMATO', 'CONTENIDO', 'PUBLICACIÓN'],
      assetPreview: {
        title: 'Tu pieza',
        fictionalBadge: 'Ejemplo de contenido ficticio',
        headlineLabel: 'Titular',
        headlineText: '¿Tienes una idea de IA pero no sabes por dónde empezar?',
        bodyLabel: 'Cuerpo',
        bodyText: 'Prueba una tarea concreta, mide el resultado y aprende de lo que ocurra.',
        ctaLabel: 'CTA',
        ctaText: 'Empieza con un experimento.',
        formatLabel: 'Formato sugerido',
        formatText: 'Post en carrusel visual / infografía con texto conciso',
      },
      canvaHandoff: {
        title: 'Crear en Canva',
        desc: 'Usa Canva para convertir esta estructura en una pieza visual lista para publicar.',
        buttonText: 'Crear contenido en Canva',
        prototypeNotice: 'Acción simulada del prototipo · Se abriría Canva con tu diseño preparado',
      },
      checklist: {
        title: 'Lista de verificación antes de lanzar',
        items: [
          'Mensaje definido',
          'Formato elegido',
          'CTA definido',
          'KPI definido',
          'Fecha de publicación',
        ],
      },
      primaryCta: 'Ya lo ejecuté · Medir resultados',
      secondaryAction: 'Volver',
    },
    screenImprove: {
      kicker: 'Paso 07 · Mejorar',
      headline: '¿Qué aprendimos?',
      supportingText: 'El resultado no es solo un número. Es información para decidir qué hacer después.',
      alpacaMessage: 'Eso es crecimiento: probar, aprender y volver a intentar.',
      coachName: 'Alfi · Tu Coach de Crecimiento',
      form: {
        title: 'Resultados del experimento',
        realDataNote: 'Incluye datos reales. No inventes métricas.',
        impressions: 'Impresiones / Alcance',
        clicks: 'Clicks',
        signups: 'Registros',
        engagement: 'Participación',
        conversions: 'Conversiones',
        notes: 'Notas y observaciones cualitativas',
        analyzeButton: 'Analizar resultados con tu Coach',
        analyzingText: 'Analizando métricas con tu Coach...',
      },
      aiInsights: {
        title: 'Lo que aprendimos',
        demoBadge: 'Datos de demostración',
        confidenceIndicator: 'Basado en los datos registrados',
        sections: {
          worked: {
            label: '1. FUNCIONÓ',
            title: '¿Qué funcionó bien?',
            text: 'Las personas hicieron clic en la propuesta.',
          },
          didNotWork: {
            label: '2. NO FUNCIONÓ',
            title: '¿Qué no produjo el resultado esperado?',
            text: 'La conversión final estuvo por debajo del objetivo.',
          },
          evidence: {
            label: '3. EVIDENCIA',
            title: '¿Qué datos respaldan esta conclusión?',
            text: '48 clics frente a 7 registros.',
          },
          nextAction: {
            label: '4. SIGUIENTE ACCIÓN',
            title: '¿Qué debemos probar después?',
            text: 'Probar una versión del mensaje con una propuesta de valor más específica.',
          },
        },
      },
      nextExperimentCard: {
        title: 'Tu próxima hipótesis',
        text: 'Si hacemos más específica la propuesta de valor, esperamos aumentar la tasa de registro.',
      },
      loopVisual: {
        title: 'El ciclo continuo de Crecimiento',
        centerText: 'Aprender · Hacer · Medir · Mejorar',
        steps: ['01 Definir', '02 Diagnosticar', '03 Aprender', '04 Construir', '05 Experimentar', '06 Ejecutar', '07 Mejorar'],
      },
      finalProductMessage: {
        title: 'Principio Rector',
        quote: 'No necesitas saberlo todo para empezar.\nNecesitas saber cuál es tu próximo paso.',
      },
      primaryCta: 'Empezar otro experimento',
      secondaryCta: 'Guardar aprendizaje',
      savedToast: '¡Aprendizaje guardado con éxito!',
    },
    screenBuildTransition: {
      badge: 'Paso 04 · Construir',
      title: '¡Momento de construir tus activos con IA!',
      subtitle: 'Ahora que tu propuesta de valor está clara, utilizaremos la IA para redactar tus primeros copys, titulares y ganchos de atracción.',
      summaryTitle: 'Tu propuesta de valor calibrada',
      nextSteps: [
        'Generar el titular magnético con fórmulas probadas de IA',
        'Redactar 3 ganchos de conversión para tu público objetivo',
        'Estructurar una llamada a la acción (CTA) irresistible',
      ],
      backToLearn: 'Volver a 03 Aprender',
    },
  },
  pt: {
    brand: {
      name: 'AI Growth Coach',
      tagline: 'Aprenda. Faça. Melhore.',
      badge: 'Guia de Marketing com IA',
    },
    navigation: {
      steps: [
        { id: 1, num: '01', label: 'Definir', shortDesc: 'Meta & Foco' },
        { id: 2, num: '02', label: 'Diagnosticar', shortDesc: 'Oportunidades' },
        { id: 3, num: '03', label: 'Aprender', shortDesc: 'Conceitos essenciais' },
        { id: 4, num: '04', label: 'Construir', shortDesc: 'Ativos de marketing' },
        { id: 5, num: '05', label: 'Experimentar', shortDesc: 'Testes rápidos' },
        { id: 6, num: '06', label: 'Executar', shortDesc: 'Lançamento prático' },
        { id: 7, num: '07', label: 'Melhorar', shortDesc: 'Otimização' },
      ],
    },
    screenDefine: {
      kicker: 'Passo 01 · Fundamentos',
      title: 'O que você quer fazer crescer?',
      reassurance: 'Comece com o seu objetivo. Nós cuidaremos do resto.',
      goalsLabel: 'Selecione o que melhor descreve seu projeto:',
      goalsHelp: 'Isso adaptará o vocabulário e os fluxos de IA recomendados.',
      goals: {
        product: {
          icon: 'Rocket',
          title: 'Um produto',
          subtitle: 'Software, app móvel, produto físico ou infoproduto digital.',
        },
        community: {
          icon: 'Users',
          title: 'Uma comunidade',
          subtitle: 'Grupo exclusivo, membros ativos ou rede de interesse comum.',
        },
        course: {
          icon: 'BookOpen',
          title: 'Um curso',
          subtitle: 'Workshop ao vivo, treinamento online ou mentoria.',
        },
        business: {
          icon: 'Briefcase',
          title: 'Um negócio',
          subtitle: 'Comércio local, consultoria, agência ou pequena empresa.',
        },
        brand: {
          icon: 'PenTool',
          title: 'Uma marca pessoal',
          subtitle: 'Criador de conteúdo, especialista ou profissional autônomo.',
        },
        education: {
          icon: 'GraduationCap',
          title: 'Um projeto educativo',
          subtitle: 'Divulgação, podcast, newsletter ou projeto social.',
        },
      },
      objectiveLabel: 'O que você quer alcançar?',
      objectiveHelp: 'Escreva com suas próprias palavras; a IA ajudará a refinar no próximo passo.',
      objectivePlaceholder: 'Exemplo: Conquistar meus primeiros 50 clientes pagantes, ou criar uma lista de espera com 200 pessoas interessadas...',
      quickPromptsLabel: 'Precisa de inspiração? Toque em uma para preencher:',
      quickPrompts: [
        'Conquistar meus primeiros 50 clientes pagantes',
        'Validar uma oferta e criar uma lista de espera de 200 pessoas',
        'Aumentar minhas vendas mensais em 30% no meu nicho',
      ],
      timelineLabel: 'Quando você quer alcançar isso?',
      timelineHelp: 'Definir o horizonte ajuda a dosar a velocidade e complexidade das ações.',
      timelineOptions: {
        '7d': {
          label: '7 dias',
          desc: 'Sprint rápido de validação e primeiros contatos',
        },
        '30d': {
          label: '30 dias',
          desc: 'Plano mensal equilibrado de lançamento e tração',
        },
        '90d': {
          label: '90 dias',
          desc: 'Estratégia completa de posicionamento e escala',
        },
      },
      experienceLabel: 'Qual é o seu nível de experiência com Marketing?',
      experienceHelp: 'Ajustamos as explicações e ferramentas para você nunca se sentir sobrecarregado.',
      experienceOptions: {
        beginner: {
          label: 'Estou começando',
          desc: 'Tudo é novo para mim. Prefiro passos guiados e sem jargões difíceis.',
        },
        basics: {
          label: 'Sei o básico',
          desc: 'Entendo termos como público-alvo, mas sinto falta de um processo organizado.',
        },
        experienced: {
          label: 'Tenho experiência',
          desc: 'Já executei campanhas antes e quero acelerar o ritmo com apoio de IA.',
        },
      },
      alpacaGuidance: {
        coachName: 'Alfi · Seu Coach Alpaca',
        quote: 'Não se preocupe. Você não precisa saber a resposta para tudo. Vamos descobrir isso juntos passo a passo.',
        tip: 'A maioria dos negócios prósperos começou com um objetivo simples. O segredo é quebrá-lo em tarefas práticas guiadas por IA.',
        whyImportantTitle: 'Por que começamos por aqui?',
        whyImportantBody: 'Um objetivo nítido permite que a IA crie copys, personas e táticas que realmente conversem com as dores do seu cliente.',
      },
      cta: 'Continuar para o Diagnóstico',
      ctaHint: 'Suas escolhas serão salvas e você avançará para o Passo 02.',
      validationWarning: 'Por favor selecione o que deseja fazer crescer e descreva brevemente seu objetivo.',
    },
    screenDiagnose: {
      kicker: 'Passo 02 · Diagnóstico',
      headline: 'Agora vamos entender onde você está.',
      supportingText: 'Você não precisa ter todas as respostas. Vou fazer algumas perguntas para encontrar o melhor ponto de partida.',
      alpacaMessage: 'Vamos passo a passo. Você não precisa dominar Marketing para começar.',
      coachName: 'Alfi · Seu Coach de Crescimento',
      q1: {
        title: 'Quem você quer alcançar?',
        helper: 'Descreva a pessoa, grupo ou tipo de cliente que você quer atrair.',
        placeholder: 'Ex: Donos de cafeterias locais, designers freelancers, ou pessoas que querem aprender finanças...',
        chipsLabel: 'Ideias para inspirar? Toque para testar:',
        chips: [
          'Clientes ou consumidores finais',
          'Pequenas empresas ou negócios B2B',
          'Profissionais autônomos',
        ],
      },
      q2: {
        title: 'O que você tem atualmente?',
        helper: 'Selecione todas as opções que se aplicam (você pode marcar várias):',
        options: {
          no_audience: 'Ainda não tenho audiência',
          social_media: 'Redes sociais',
          community: 'Comunidade',
          newsletter: 'Newsletter / lista',
          clients: 'Clientes ou usuários',
          course_product: 'Curso / produto',
          other: 'Outro',
        },
      },
      q3: {
        title: 'Qual é a sua principal dificuldade?',
        helper: 'Escolha apenas uma dificuldade principal para definir sua prioridade:',
        options: {
          target_audience: 'Não sei para quem devo falar',
          differentiation: 'Não sei como diferenciar minha proposta',
          attract: 'Não sei como atrair pessoas',
          engagement: 'As pessoas chegam, mas não participam',
          content_creation: 'Não sei que conteúdo criar',
          metrics: 'Não sei como medir resultados',
          what_to_change: 'Tenho resultados, mas não sei o que mudar',
          other: 'Outro',
        },
      },
      q4: {
        title: 'O quanto você está familiarizado com Marketing?',
        helper: 'Ajustamos as explicações e ferramentas para você nunca se sentir sobrecarregado:',
        options: {
          beginner: {
            label: 'Estou começando',
            desc: 'Tudo é novo para mim. Prefiro passos simples e sem jargões.',
          },
          basics: {
            label: 'Conheço o básico',
            desc: 'Entendo conceitos como público-alvo e redes, mas preciso de um roteiro claro.',
          },
          experienced: {
            label: 'Tenho experiência',
            desc: 'Já rodei campanhas e quero acelerar minha estratégia com IA.',
          },
        },
      },
      otherFieldLabel: 'Especifique sua opção:',
      otherPlaceholder: 'Escreva sua resposta aqui...',
      aiPreview: {
        badge: 'Próxima etapa',
        title: 'Seu coach vai analisar isso',
        text: 'Com suas respostas, vou identificar sua etapa de Growth, seu principal gargalo e o próximo conceito que você precisa aprender.',
        notice: 'Prévia conceitual · Não inventamos resultados fictícios antes da hora.',
      },
      primaryCta: 'Encontrar meu ponto de partida',
      secondaryAction: 'Voltar',
      requiredHint: 'Preencha seu público-alvo, pelo menos 1 opção atual e sua principal dificuldade para avançar.',
    },
    screenTransitionLearn: {
      badge: 'Passo 03 · Transição para Aprender',
      title: 'Diagnóstico pronto! Seu ponto de partida foi definido',
      subtitle: 'Seu coach Alfi estruturou suas respostas para preparar suas lições personalizadas com IA.',
      previewCardTitle: 'Estrutura conceitual pronta para sua IA (Context Schema)',
      nextTitle: 'O que você desbloqueará no Passo 03: Aprender',
      nextSteps: [
        'Lição interativa focada na sua principal dificuldade',
        'Modelos de prompts de IA adaptados ao seu nível de experiência',
        'Primeiro experimento prático sem teorias desnecessárias',
      ],
      backDiagnose: 'Modificar diagnóstico',
      backDefine: 'Voltar a 01 Definir',
    },
    screenLearn: {
      kicker: 'Passo 03 · Aprender',
      headline: 'Aprenda o que você precisa para avançar.',
      supportingText: 'Você não precisa se tornar especialista em Marketing. Vamos aprender exatamente o que você precisa para tomar sua próxima decisão.',
      alpacaMessage: 'Prometo que hoje não vamos ler um manual de 400 páginas.',
      coachName: 'Alfi · Seu Coach de Crescimento',
      startingPoint: {
        title: 'Seu ponto de partida',
        projectType: 'Tipo de projeto',
        objective: 'Objetivo',
        audience: 'Público-alvo',
        mainDifficulty: 'Principal dificuldade',
        marketingExperience: 'Experiência em Marketing',
        unspecified: 'Ainda não especificado',
      },
      conceptCard: {
        sectionLabel: 'CONCEITO-CHAVE',
        conceptName: 'Proposta de valor',
        conceptDesc: 'Sua proposta de valor explica por que alguém deveria escolher seu produto, serviço, comunidade ou projeto em vez de outra alternativa.',
        blocks: {
          problem: {
            title: 'Problema',
            desc: 'A dor ou necessidade real enfrentada pelo seu cliente em potencial.',
          },
          value: {
            title: 'Valor',
            desc: 'O alívio ou transformação concreta que você entrega a ele.',
          },
          differentiation: {
            title: 'Diferenciação',
            desc: 'Por que sua solução é única ou mais vantajosa que as alternativas.',
          },
        },
      },
      exampleCard: {
        title: 'Exemplo realista',
        badge: 'Estudo de caso',
        problemLabel: 'Problema',
        problemText: 'Não sei onde aprender Marketing sem me perder em centenas de cursos.',
        valueLabel: 'Valor',
        valueText: 'Aprendizado prático guiado por IA.',
        differentiationLabel: 'Diferenciação',
        differentiationText: 'Você aprende enquanto aplica.',
      },
      exercise: {
        badge: 'Mini exercício',
        title: 'Experimente você',
        question: 'Qual destas frases comunica melhor uma proposta de valor?',
        options: {
          A: 'Temos uma comunidade de Marketing.',
          B: 'Aprenda Marketing fazendo sua primeira campanha com acompanhamento de IA.',
          C: 'Somos uma plataforma digital inovadora.',
        },
        feedbackCorrect: 'Exato! Uma boa proposta de valor deixa claro qual problema você resolve e o que torna sua solução diferente.',
        feedbackIncorrect: 'Quase. Procure a opção que explica melhor o valor que a pessoa recebe, e não apenas o que a empresa oferece.',
        retryHint: 'Tente selecionar outra opção para perceber o contraste.',
        continueHint: 'Excelente compreensão! Você dominou a lógica da proposta de valor.',
      },
      primaryCta: 'Entendi. Vamos construir',
      secondaryAction: 'Voltar',
      ctaDisabledHint: 'Escolha uma resposta no mini exercício para continuar.',
    },
    screenBuild: {
      kicker: 'Passo 04 · Construir',
      headline: 'Agora vamos construir isso juntos.',
      supportingText: 'Sua ideia não precisa estar perfeita. Vamos transformá-la em uma primeira versão que você possa testar.',
      alpacaMessage: 'Eu ajudo você a organizar as ideias. A decisão final continua sendo sua.',
      coachName: 'Alfi · Seu Coach de Crescimento',
      mainTitle: 'Vamos construir sua proposta de valor',
      step1: {
        title: 'Que problema você quer resolver?',
        helper: 'Descreva com suas próprias palavras. Você não precisa usar termos de Marketing.',
        placeholder: 'Ex.: As pessoas querem aprender IA, mas não sabem por onde começar.',
      },
      step2: {
        title: 'Para quem você está resolvendo esse problema?',
        helper: 'Defina com clareza quem é o seu usuário ou cliente ideal.',
        placeholder: 'Ex.: Profissionais que querem aplicar IA no seu trabalho.',
      },
      step3: {
        title: 'Que mudança você quer gerar para essa pessoa?',
        helper: 'Descreva a transformação prática ou o alívio concreto que ela experimenta.',
        placeholder: 'Ex.: Que ela consiga aplicar IA em uma tarefa real do seu trabalho.',
      },
      aiCoachPanel: {
        title: 'Seu coach sugere',
        draftBadge: 'Rascunho gerado por IA',
        proposalText: 'Para profissionais que querem aplicar IA no seu trabalho, o AI Growth Coach ajuda a transformar uma ideia em uma ação concreta, ensinando o que fazer, como testar e como medir o resultado.',
        alternateProposals: [
          'Para profissionais que buscam aplicar IA no dia a dia, ajudamos a criar e lançar sua primeira campanha com IA em menos de 7 dias, sem enrolação teórica.',
          'Para criadores e pequenas empresas, transformamos metas de negócio em testes práticos de marketing guiados passo a passo com IA.',
        ],
        useProposalBtn: 'Usar proposta',
        editBtn: 'Editar',
        createAnotherBtn: 'Criar outra',
        transparencyNote: 'A IA propõe. Você decide.',
      },
      resultCard: {
        title: 'Resultado desta etapa',
        problemLabel: 'Problema',
        personaLabel: 'Persona',
        valueLabel: 'Valor',
        valuePropLabel: 'Proposta de valor',
        emptyPlaceholder: 'Aguardando preenchimento...',
      },
      primaryCta: 'Transformar em experimento',
      secondaryAction: 'Voltar',
      fillFieldsHint: 'Preencha os 3 campos ou adote a sugestão do coach para prosseguir.',
    },
    screenExperiment: {
      kicker: 'Passo 05 · Experimentar',
      headline: 'Vamos transformar a ideia em uma hipótese.',
      supportingText: 'Não vamos adivinhar. Vamos testar algo concreto e medir o que acontece.',
      alpacaMessage: 'Agora sim! Temos algo para aprender com o mundo real.',
      coachName: 'Alfi · Seu Coach de Crescimento',
      cardTitle: 'Ficha do Experimento',
      fields: {
        objective: {
          label: 'OBJETIVO',
          placeholder: 'O que você quer alcançar? Ex: Conquistar os primeiros 20 usuários interessados em 7 dias.',
        },
        hypothesis: {
          label: 'HIPÓTESE',
          helper: 'Fórmula: Se fizermos X, esperamos alcançar Y porque Z.',
          placeholder: 'Se publicarmos um guia prático de IA no LinkedIn, esperamos atrair 30 cadastros porque resolve a maior dúvida do nosso público.',
        },
        channel: {
          label: 'CANAL / MEIO',
          options: {
            linkedin: 'LinkedIn',
            instagram: 'Instagram',
            email: 'Email / Newsletter',
            community: 'Comunidade',
            website: 'Site / Landing Page',
            other: 'Outro canal',
          },
        },
        message: {
          label: 'MENSAGEM / GANCHO',
          placeholder: 'O título ou gancho principal que seu público verá...',
        },
        cta: {
          label: 'CHAMADA PARA AÇÃO (CTA)',
          placeholder: 'Ex: Clique aqui para baixar o template gratuito',
        },
        kpi: {
          label: 'KPI PRINCIPAL',
          options: {
            reach: 'Alcance / Impressões',
            clicks: 'Cliques no link',
            signups: 'Cadastros / Inscrições',
            engagement: 'Participação / Respostas',
            conversions: 'Conversões em clientes',
          },
        },
        baseline: {
          label: 'LINHA DE BASE (VALOR ATUAL)',
          placeholder: '0',
        },
        duration: {
          label: 'DURAÇÃO',
          options: {
            '7d': '7 dias (Sprint)',
            '14d': '14 dias (Padrão)',
            '30d': '30 dias (Mês completo)',
          },
        },
      },
      aiValidation: {
        title: 'Revisão do seu coach',
        badge: 'Pronto para testar',
        reviewText: 'Sua hipótese é clara, o canal está definido e você já tem uma métrica para avaliar o resultado.',
        transparency: 'A IA avalia a coerência do experimento. Você decide se quer executá-lo.',
      },
      primaryCta: 'Preparar execução',
      secondaryAction: 'Voltar',
      validationHint: 'Preencha ao menos o objective e a hipótese para preparar a execução.',
    },
    screenExecute: {
      kicker: 'Passo 06 · Executar',
      headline: 'Leve isso para o mundo real.',
      supportingText: 'Você já tem a estratégia. Agora transforme-a em algo que possa publicar, compartilhar ou testar.',
      alpacaMessage: 'Menos perfeição. Mais testes.',
      coachName: 'Alfi · Seu Coach de Crescimento',
      flowTitle: 'Fluxo de materialização',
      flowSteps: ['OBJETIVO', 'MENSAGEM', 'FORMATO', 'CONTEÚDO', 'PUBLICAÇÃO'],
      assetPreview: {
        title: 'Sua peça',
        fictionalBadge: 'Exemplo de conteúdo fictício',
        headlineLabel: 'Título',
        headlineText: 'Você tem uma ideia com IA mas não sabe por onde começar?',
        bodyLabel: 'Corpo da mensagem',
        bodyText: 'Teste uma tarefa concreta, meça o resultado e aprenda com o que acontecer.',
        ctaLabel: 'CTA',
        ctaText: 'Comece com um experimento.',
        formatLabel: 'Formato sugerido',
        formatText: 'Post em carrossel visual / infográfico com texto direto',
      },
      canvaHandoff: {
        title: 'Criar no Canva',
        desc: 'Use o Canva para transformar esta estrutura em uma peça visual pronta para postar.',
        buttonText: 'Criar conteúdo no Canva',
        prototypeNotice: 'Ação simulada do protótipo · O Canva abriria com o seu template preparado',
      },
      checklist: {
        title: 'Checklist antes de lançar',
        items: [
          'Mensagem definida',
          'Formato escolhido',
          'CTA definido',
          'KPI definido',
          'Data de publicação',
        ],
      },
      primaryCta: 'Já executei · Medir resultados',
      secondaryAction: 'Voltar',
    },
    screenImprove: {
      kicker: 'Passo 07 · Melhorar',
      headline: 'O que aprendemos?',
      supportingText: 'O resultado não é apenas um número. É informação para decidir o que fazer depois.',
      alpacaMessage: 'Isso é crescimento: testar, aprender e tentar de novo.',
      coachName: 'Alfi · Seu Coach de Crescimento',
      form: {
        title: 'Resultados do experimento',
        realDataNote: 'Inclua dados reais. Não invente métricas.',
        impressions: 'Impressões / Alcance',
        clicks: 'Cliques',
        signups: 'Cadastros',
        engagement: 'Participação',
        conversions: 'Conversões',
        notes: 'Notas e observações qualitativas',
        analyzeButton: 'Analisar resultados com seu Coach',
        analyzingText: 'Analisando métricas com seu Coach...',
      },
      aiInsights: {
        title: 'O que aprendemos',
        demoBadge: 'Dados de demonstração',
        confidenceIndicator: 'Baseado nos dados registrados',
        sections: {
          worked: {
            label: '1. FUNCIONOU',
            title: 'O que funcionou bem?',
            text: 'As pessoas clicaram na proposta.',
          },
          didNotWork: {
            label: '2. NÃO FUNCIONOU',
            title: 'O que não produziu o resultado esperado?',
            text: 'A conversão final ficou abaixo do objetivo.',
          },
          evidence: {
            label: '3. EVIDÊNCIA',
            title: 'Quais dados respaldam essa conclusão?',
            text: '48 cliques em comparação a 7 cadastros.',
          },
          nextAction: {
            label: '4. PRÓXIMA AÇÃO',
            title: 'O que devemos testar a seguir?',
            text: 'Testar uma versão da mensagem com uma proposta de valor mais específica.',
          },
        },
      },
      nextExperimentCard: {
        title: 'Sua próxima hipótese',
        text: 'Se tornarmos a proposta de valor mais específica, esperamos aumentar a taxa de conversão.',
      },
      loopVisual: {
        title: 'O ciclo contínuo de Crescimento',
        centerText: 'Aprender · Fazer · Medir · Melhorar',
        steps: ['01 Definir', '02 Diagnosticar', '03 Aprender', '04 Construir', '05 Experimentar', '06 Executar', '07 Melhorar'],
      },
      finalProductMessage: {
        title: 'Princípio Norteador',
        quote: 'Você não precisa saber tudo para começar.\nPrecisa saber qual é o seu próximo passo.',
      },
      primaryCta: 'Começar outro experimento',
      secondaryCta: 'Salvar aprendizado',
      savedToast: 'Aprendizado salvo com sucesso!',
    },
    screenBuildTransition: {
      badge: 'Passo 04 · Construir',
      title: 'Hora de construir seus materiais com IA!',
      subtitle: 'Agora que sua proposta de valor está clara, vamos usar a IA para redigir seus primeiros copys, títulos e ganchos de conversão.',
      summaryTitle: 'Sua proposta de valor calibrada',
      nextSteps: [
        'Gerar o título magnético com fórmula validada de IA',
        'Redigir 3 ganchos de conversão para seu público-alvo',
        'Estruturar sua chamada para ação (CTA) irresistível',
      ],
      backToLearn: 'Voltar a 03 Aprender',
    },
  },
};
