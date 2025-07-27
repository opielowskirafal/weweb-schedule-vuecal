export default {
  editor: {
    label: {
      en: "Calendar Vue Schedule",
      pl: "Kalendarz Vue Schedule"
    },
  },
  properties: {
    primaryColor: {
      label: {
        en: "Primary color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "#1976d2",
    },
    secondaryColor: {
      label: {
        en: "Secondary color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "#ffffff",
    },
    baseColor: {
      label: {
        en: "Base color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "#000000",
    },
    contrastColor: {
      label: {
        en: "Contrast color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "#ffffff",
    },
    borderColor: {
      label: {
        en: "Border color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "rgba(0, 0, 0, 0.08)",
    },
    headerColor: {
      label: {
        en: "Header color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "#ffffff",
    },
    eventColor: {
      label: {
        en: "Event color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "#ffffff",
    },
    eventBorderColor: {
      label: {
        en: "Event border color",
      },
      type: "Color",
      bindable: true,
      defaultValue: "currentColor",
    },
    borderRadius: {
      label: {
        en: "Border radius (px)",
      },
      type: "Number",
      bindable: true,
      defaultValue: 6,
    },
    height: {
      label: {
        en: "Height (px)",
      },
      type: "Number",
      bindable: true,
      defaultValue: 800,
    },
    minScheduleWidth: {
      label: {
        en: "Min schedule width (px)",
      },
      type: "Number",
      bindable: true,
      defaultValue: 0,
    },
    minCellWidth: {
      label: {
        en: "Min cell width (px)",
      },
      type: "Number",
      bindable: true,
      defaultValue: 0,
    },
    transitionDuration: {
      label: {
        en: "Transition duration (s)",
      },
      type: "Number",
      bindable: true,
      defaultValue: 0.25,
    },
    events: {
      bindable: true,
      section: "settings",
      label: {
        en: "Events",
        pl: "Wydarzenia",
      },
      type: "Array",
      options: {
        getItemLabel(item) {
          return (
            item?.title || `Event ${Math.random().toString(36).substring(2, 8)}`
          );
        },
        item: {
          type: "Object",
          options: {
            item: {
              id: {
                label: { en: "ID", pl: "ID" },
                type: "Text",
                defaultValue: "",
              },
              title: {
                label: { en: "Title", pl: "Tytuł" },
                type: "Text",
                defaultValue: "New Event",
              },
              start: {
                label: { en: "Start", pl: "Początek" },
                type: "Text",
                defaultValue: new Date().toISOString(),
              },
              end: {
                label: { en: "End", pl: "Koniec" },
                type: "Text",
                defaultValue: new Date(
                  new Date().getTime() + 60 * 60 * 1000
                ).toISOString(),
              },
              content: {
                label: { en: "Content", pl: "Zawartość" },
                type: "Text",
                defaultValue: "",
              },
              color: {
                label: { en: "Color", pl: "Kolor tekstu" },
                type: "Color",
                defaultValue: "#FFFFFF",
              },
              backgroundColor: {
                label: { en: "Background Color", pl: "Kolor tła" },
                type: "Color",
                defaultValue: "#42b983",
              },
              class: {
                label: { en: "Class", pl: "Klasa" },
                type: "Text",
                defaultValue: "",
              },
              allDay: {
                label: { en: "All day", pl: "Cały dzień" },
                type: "OnOff",
                defaultValue: false,
              },
              deletable: {
                label: { en: "Deletable", pl: "Możliwe do usunięcia" },
                type: "OnOff",
                defaultValue: true,
              },
              resizable: {
                label: { en: "Resizable", pl: "Możliwe do zmiany rozmiaru" },
                type: "OnOff",
                defaultValue: true,
              },
              draggable: {
                label: { en: "Draggable", pl: "Przeciągalne" },
                type: "OnOff",
                defaultValue: true,
              },
              background: {
                label: { en: "Background", pl: "Background" },
                type: "OnOff",
                defaultValue: false,
              },
              schedule: {
                label: { en: "Schedule", pl: "Harmonogram" },
                type: "Number",
                defaultValue: null,
              },
              meta: {
                label: { en: "Metadata", pl: "Metadane" },
                type: "Text",
                defaultValue: "",
              },
            },
          },
        },
      },
      defaultValue: [
        {
          start: `2025-07-26 12:00`,
          end: `2025-07-26 13:00`,
          title: 'Trening1',
          content: 'Jerzy Maciąg',
          class: '',
          draggable: true,
          resizable: true,
          deletable: true,
          allDay: false,
          schedule: 1,
          background: false,
        },
        {
          start: `2025-07-26 08:00`,
          end: `2025-07-26 09:00`,
          title: 'Trening 2',
          content: 'Maria Jop',
          class: '',
          draggable: true,
          resizable: true,
          deletable: true,
          allDay: false,
          schedule: 2,
          background: false,
        }
      ],
    },
    showEventTime: {
      label: { en: "Show event time", pl: "Pokaż czas wydarzenia" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    timeStart: {
      label: { en: "Start hour", pl: "Godzina rozpoczęcia" },
      type: "Number",
      bindable: true,
      defaultValue: 8,
    },
    timeEnd: {
      label: { en: "End hour", pl: "Godzina zakończenia" },
      type: "Number",
      bindable: true,
      defaultValue: 20,
    },
    timeStep: {
      label: { en: "Time step (min)", pl: "Krok czasu (min)" },
      type: "Number",
      bindable: true,
      defaultValue: 30,
    },
    locale: {
      label: { en: "Locale", pl: "Język" },
      type: "TextSelect",
      section: "settings",
      bindable: true,
      defaultValue: "auto",
      options: {
        options: [
          { value: "auto", label: "Current Lang" },
          { value: "en-us", label: "English" },
          { value: "pl", label: "Polski" },
          { value: "fr", label: "French" },
          { value: "es", label: "Spanish" },
          { value: "de", label: "German" },
          { value: "it", label: "Italian" },
          { value: "pt", label: "Portuguese" },
          { value: "ru", label: "Russian" },
          { value: "zh-cn", label: "Chinese (Simplified)" },
          { value: "ja", label: "Japanese" },
          { value: "ar", label: "Arabic" },
        ],
      },
      bindingValidation: {
        type: "string",
        tooltip: "Bind to a string value for the locale code (e.g., 'en', 'fr')",
      },
    },
    timezone: {
      label: { en: "Timezone", pl: "Strefa czasowa" },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "auto",
      bindingValidation: {
        type: "string",
        tooltip: "Bind to a string value for the timezone (e.g., 'Europe/Warsaw')",
      },
    },
    yearView: {
      label: { en: "Year view", pl: "Widok roku" },
      type: "OnOff",
      section: "settings",
      bindable: true,
      responsive: true,
      defaultValue: true,
      bindingValidation: {
        type: "boolean",
        tooltip: "Bind to a boolean value to enable/disable year view",
      },
    },
    monthView: {
      label: { en: "Month view", pl: "Widok miesiąca" },
      type: "OnOff",
      section: "settings",
      bindable: true,
      responsive: true,
      defaultValue: true,
      bindingValidation: {
        type: "boolean",
        tooltip: "Bind to a boolean value to enable/disable month view",
      },
    },
    weekView: {
      label: { en: "Week view", pl: "Widok tygodnia" },
      type: "OnOff",
      section: "settings",
      bindable: true,
      responsive: true,
      defaultValue: true,
      bindingValidation: {
        type: "boolean",
        tooltip: "Bind to a boolean value to enable/disable week view",
      },
    },
    dayView: {
      label: { en: "Day view", pl: "Widok dnia" },
      type: "OnOff",
      section: "settings",
      bindable: true,
      responsive: true,
      defaultValue: true,
      bindingValidation: {
        type: "boolean",
        tooltip: "Bind to a boolean value to enable/disable day view",
      },
    },
    defaultView: {
      label: { en: "Default view", pl: "Domyślny widok" },
      type: "TextSelect",
      section: "settings",
      bindable: true,
      responsive: true,
      defaultValue: "week",
      options: {
        options: [
          { value: "year", label: "Year" },
          { value: "month", label: "Month" },
          { value: "week", label: "Week" },
          { value: "day", label: "Day" },
        ],
      },
      bindingValidation: {
        type: "string",
        tooltip: "Bind to a string value for the default view: year | month | week | day",
      },
    },
    allDayEvents: {
      label: { en: "All day events", pl: "Wydarzenia całodniowe" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    hideWeekends: {
      label: { en: "Hide weekends", pl: "Ukryj weekendy" },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    allowEventCreation: {
      label: { en: "Allow event creation", pl: "Pozwól na tworzenie wydarzeń" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    allowEventResize: {
      label: { en: "Allow event resize", pl: "Pozwól na zmianę rozmiaru wydarzeń" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    allowEventDrag: {
      label: { en: "Allow event drag", pl: "Pozwól na przeciąganie wydarzeń" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    allowEventDelete: {
      label: { en: "Allow event delete", pl: "Pozwól na usuwanie wydarzeń" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    minEventWidth: {
      label: { en: "Min event width (px)", pl: "Minimalna szerokość wydarzenia (px)" },
      type: "Number",
      bindable: true,
      defaultValue: 0,
    },
    disableDays: {
      label: { en: "Disable days", pl: "Wyłączone dni" },
      type: "Array",
      bindable: true,
      defaultValue: [],
    },
    snapToInterval: {
      label: { en: "Snap to interval (min)", pl: "Przyleganie do interwału (min)" },
      type: "Number",
      bindable: true,
      defaultValue: 30,
    },
    allowEventOverlap: {
      label: { en: "Allow event overlap", pl: "Pozwól na nakładanie wydarzeń" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    specialHours: {
      label: { en: "Special hours", pl: "Godziny specjalne" },
      type: "Array",
      bindable: true,
      defaultValue: [],
    },
    timeCellHeight: {
      label: { en: "Time cell height (px)", pl: "Wysokość komórki czasu (px)" },
      type: "Number",
      bindable: true,
      defaultValue: 40,
    },
    twelveHour: {
      label: { en: "12-hour format", pl: "Format 12-godzinny" },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    datePicker: {
      label: { en: "Date picker", pl: "Wybór daty" },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    clickToNavigate: {
      label: { en: "Click to navigate", pl: "Kliknij, aby nawigować" },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    viewDate: {
      label: { en: "View date", pl: "Data widoku" },
      type: "Text",
      bindable: true,
      defaultValue: "",
    },
    selectedDate: {
      label: { en: "Selected date", pl: "Wybrana data" },
      type: "Text",
      bindable: true,
      defaultValue: "",
    },
    minDate: {
      label: { en: "Min date", pl: "Minimalna data" },
      type: "Text",
      bindable: true,
      defaultValue: "",
    },
    maxDate: {
      label: { en: "Max date", pl: "Maksymalna data" },
      type: "Text",
      bindable: true,
      defaultValue: "",
    },
    weekNumbers: {
      label: { en: "Show week numbers", pl: "Pokaż numery tygodni" },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    todayButton: {
      label: { en: "Show today button", pl: "Pokaż przycisk 'Dzisiaj'" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    titleBar: {
      label: { en: "Show title bar", pl: "Pasek tytułu" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    viewsBar: {
      label: { en: "Show views bar", pl: "Pasek widoków" },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
    },
    watchRealTime: {
      label: { en: "Watch real time", pl: "Śledź czas rzeczywisty" },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
    },
    schedules: {
      label: {
        en: "Schedules",
        pl: "Harmonogramy",
      },
      type: "Array",
      options: {
        getItemLabel(item) {
          return (
            item?.label ||
            `Schedule ${Math.random().toString(36).substring(2, 8)}`
          );
        },
        item: {
          type: "Object",
          options: {
            item: {
              id: {
                label: { en: "ID", pl: "ID" },
                type: "Text",
                defaultValue: "",
              },
              label: {
                label: { en: "Label", pl: "Etykieta" },
                type: "Text",
                defaultValue: "New Schedule",
              },
              color: {
                label: { en: "Color", pl: "Kolor" },
                type: "Color",
                defaultValue: "",
              },
              height: {
                label: { en: "Height", pl: "Wysokość" },
                type: "Number",
                defaultValue: null,
              },
              class: {
                label: { en: "Class", pl: "Class" },
                type: "Text",
                defaultValue: "",
              },
            },
          },
        },
      },
      defaultValue: [{ "id": 1, "class": "schedule1", "color": "blue", "label": "Maciej Kowalski" }, { "id": 2, "class": "schedule2", "color": "green", "label": "Justyna Wołosz" }],
      section: "settings",
      bindable: true,
    }
  },
  triggerEvents: [
    {
      name: "event:click",
      label: { en: "On event click", pl: "Po kliknięciu wydarzenia" },
      event: {
        event: {
          id: "event-1",
          start: "2025-07-26T12:00:00.000Z",
          end: "2025-07-26T13:00:00.000Z",
          title: "Sample Event",
          content: "Event content",
          allDay: false,
          color: "#42b983",
          backgroundColor: "#42b983",
          class: "meeting",
          schedule: 1,
          draggable: true,
          resizable: true,
          deletable: true,
          recurring: null,
          background: false,
        },
        domEvent: {},
      },
    },
    {
      name: "event:create",
      label: { en: "On event create", pl: "Po utworzeniu wydarzenia" },
      event: {
        event: {
          id: "event-new",
          start: "2025-07-26T14:00:00.000Z",
          end: "2025-07-26T15:00:00.000Z",
          title: "Nowe wydarzenie",
          content: "",
          allDay: false,
          color: "#42b983",
          backgroundColor: "#42b983",
          class: "",
          schedule: 1,
          draggable: true,
          resizable: true,
          deletable: true,
          recurring: null,
          background: false,
        },
      },
    },
    {
      name: "event:delete",
      label: { en: "On event delete", pl: "Po usunięciu wydarzenia" },
      event: {
        event: {
          id: "event-1",
          start: "2025-07-26T12:00:00.000Z",
          end: "2025-07-26T13:00:00.000Z",
          title: "Deleted Event",
          content: "",
          allDay: false,
          color: "#42b983",
          backgroundColor: "#42b983",
          class: "",
          schedule: 1,
          draggable: true,
          resizable: true,
          deletable: true,
          recurring: null,
          background: false,
        },
      },
    },
    {
      name: "event:resize:end",
      label: {
        en: "On event resize end",
        pl: "Po zakończeniu zmiany rozmiaru wydarzenia",
      },
      event: {
        event: {
          id: "event1",
          start: "2025-07-26T16:00:00.000Z",
          end: "2025-07-26T17:00:00.000Z",
          title: "Example Event",
          content: "",
          allDay: false,
          color: "#42b983",
          backgroundColor: "#42b983",
          class: "",
          schedule: 1,
          draggable: true,
          resizable: true,
          deletable: true,
          recurring: null,
          background: false,
        },
        overlaps: [],
      },
    },
    {
      name: "view:change",
      label: { en: "On view change", pl: "Po zmianie widoku" },
      event: {
        view: "week",
        viewTitle: "Week View",
      },
    },
    {
      name: "event:drop",
      label: { en: "On event drop", pl: "Po upuszczeniu wydarzenia" },
      event: {
        event: {
          id: "event-1",
          start: "2025-07-26T18:00:00.000Z",
          end: "2025-07-26T19:00:00.000Z",
          title: "Dropped Event",
          content: "",
          allDay: false,
          color: "#42b983",
          backgroundColor: "#42b983",
          class: "",
          schedule: 1,
          draggable: true,
          resizable: true,
          deletable: true,
          recurring: null,
          background: false,
        },
        originalEvent: {},
        external: false,
      },
    },
    {
      name: "cell:click",
      label: { en: "On cell click", pl: "Po kliknięciu komórki" },
      event: {
        date: "2025-07-26T12:00:00.000Z",
        time: 540, // minutes from midnight
        view: "week",
        schedule: 1,
      },
    },
    {
      name: "selectedDate:update",
      label: { en: "On selected date update", pl: "Po aktualizacji wybranej daty" },
      event: {
        date: "2025-07-26T12:00:00.000Z",
        view: "week",
      },
    },
  ],
};
