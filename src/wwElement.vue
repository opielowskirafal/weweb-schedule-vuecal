<script>
import { VueCal, addDatePrototypes } from 'vue-cal'
import 'vue-cal/style'

// https://antoniandre.github.io/vue-cal/date-prototypes
addDatePrototypes()

export default {
  name: "WwVueCal",
  components: {
    VueCal,
  },
  props: {
    content: { 
      type: Object, 
      required: true 
    },
    uid: { 
      type: String, 
      required: true 
    }
  },

  setup(props) {
    // === ZMIENNA DLA INFORMACJI O WIDOKU ===
    const { value: currentViewInfo, setValue: setCurrentViewInfo } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: "currentViewInfo",
      type: 'Object',
      defaultValue: null,
      readonly: true,
      resettable: false,
    });

    // === NOWA ZMIENNA DLA ZAZNACZONEJ DATY ===
    const { value: selectedDateInfo, setValue: setSelectedDateInfo } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: "selectedDateInfo",
      type: 'Object',
      defaultValue: null,
      readonly: true,
      resettable: false,
    });

    return {
      setCurrentViewInfo,
      setSelectedDateInfo,
    };
  },
  data() {
    return {
      selectedDate: new Date(),
    };
  },
  computed: {
    contentEvents() {
      const events = this.content.events || [];
      return events.map((event) => {
        let startDate, endDate;

        try {
          if (event.start) {
            startDate = new Date(event.start);
            if (isNaN(startDate.getTime())) {
              console.warn(`Invalid start date for event: ${event.id || "unknown"}`, event.start);
              startDate = new Date();
            }
          } else {
            startDate = new Date();
          }

          if (event.end) {
            endDate = new Date(event.end);
            if (isNaN(endDate.getTime())) {
              console.warn(`Invalid end date for event: ${event.id || "unknown"}`, event.end);
              endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
            }
          } else {
            endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
          }

          if (endDate <= startDate) {
            endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
          }
        } catch (e) {
          console.error("Error processing event dates:", e);
          startDate = new Date();
          endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
        }

        const eventId = event.id || Math.random().toString(36).substring(2);

        return {
          id: eventId,
          start: startDate,
          end: endDate,
          title: event.title || "Event",
          content: event.content || "",
          class: [event.class, event.background ? "background" : null].filter(Boolean).join(" "),
          background: event.background || false,
          allDay: Boolean(event.allDay),
          deletable: event.deletable !== undefined ? Boolean(event.deletable) : true,
          resizable: event.resizable !== undefined ? Boolean(event.resizable) : true,
          draggable: event.draggable !== undefined ? Boolean(event.draggable) : true,
          backgroundColor: event.backgroundColor || this.content.primaryColor || "#1976d2",
          color: event.color || this.content.eventColor || "#FFFFFF",
          schedule: event.schedule !== undefined ? event.schedule : null,
        };
      });
    },

    contentSchedules() {
      if (!this.content.schedules) return [];
      return this.content.schedules.map((schedule, i) => ({
        id: schedule.id || i + 1,
        label: schedule.label || `Schedule ${i + 1}`,
        color: schedule.color || null,
        height: schedule.height || null,
        class: schedule.class || null, // <-- DODAJ TO!

      }));
    },

    availableViews() {
      const views = [];
      if (this.content.yearView !== false) views.push('year');
      if (this.content.monthView !== false) views.push('month');
      if (this.content.weekView !== false) views.push('week');
      if (this.content.dayView !== false) views.push('day');
      return views.length > 0 ? views : ['week'];
    },

    defaultView() {
      const view = this.content.defaultView || 'week';
      return this.availableViews.includes(view) ? view : this.availableViews[0];
    },

    locale() {
      const loc = this.content.locale || 'auto';
      return loc === 'auto' ? 'pl' : loc;
    },

    editableEvents() {
      return {
        create: this.content.allowEventCreation !== false,
        resize: this.content.allowEventResize !== false,
        drag: this.content.allowEventDrag !== false,
        delete: this.content.allowEventDelete !== false,
      };
    },

    processedSpecialHours() {
      return this.content.specialHours || [];
    },

    computedViewDate() {
      if (this.content.viewDate) {
        const vd = new Date(this.content.viewDate);
        if (!isNaN(vd.getTime())) {
          return vd;
        }
      }
      return new Date();
    },

    computedSelectedDate() {
      if (this.content.selectedDate) {
        const sd = new Date(this.content.selectedDate);
        if (!isNaN(sd.getTime())) {
          return sd;
        }
      }
      return null;
    },

    // Style object for vue-cal
    vueCalStyles() {
      return {
        '--vuecal-primary-color': this.content.primaryColor || '#1976d2',
        '--vuecal-secondary-color': this.content.secondaryColor || '#ffffff',
        '--vuecal-base-color': this.content.baseColor || '#000000',
        '--vuecal-contrast-color': this.content.contrastColor || '#ffffff',
        '--vuecal-border-color': this.content.borderColor || 'rgba(0, 0, 0, 0.08)',
        '--vuecal-header-color': this.content.headerColor || '#ffffff',
        '--vuecal-event-color': this.content.eventColor || '#ffffff',
        '--vuecal-event-border-color': this.content.eventBorderColor || 'currentColor',
        '--vuecal-border-radius': `${this.content.borderRadius || 6}px`,
        '--vuecal-height': `${this.content.height+'px' || '100%'}`,
      };
    }
  },

  methods: {
    safeToISOString(date) {
      if (!date) return "";
      try {
        if (date instanceof Date) {
          return date.toISOString();
        }
        if (typeof date === "string") {
          const dateObj = new Date(date);
          return isNaN(dateObj.getTime()) ? "" : dateObj.toISOString();
        }
        return "";
      } catch (error) {
        console.error("Error converting date to ISO string:", error);
        return "";
      }
    },

    formatDates(obj) {
      if (Array.isArray(obj)) {
        return obj.map(this.formatDates);
      } else if (obj && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
          if (
            obj[key] instanceof Date ||
            (obj[key] && typeof obj[key].toISOString === 'function')
          ) {
            newObj[key] = this.safeToISOString(obj[key]);
          } else {
            newObj[key] = this.formatDates(obj[key]);
          }
        }
        return newObj;
      }
      return obj;
    },

    // KLUCZOWA ZMIANA: Używamy tej samej sygnatury co w działającym kodzie
    handleEventClick(payload, domEvent) {
      const event = payload.event;
      console.log("Event clicked:", event.id);
      
      if (!event) return;

      this.$emit("trigger-event", {
        name: "event:click",
        event: {
          event: {
            ...event,
            start: this.safeToISOString(event.start),
            end: this.safeToISOString(event.end)
          },
        },
      });
    },

    createEvent(data) {
      try {
        console.log("createEvent received:", data);

        if (!data || !data.event) {
          console.error("No event data in createEvent payload");
          if (typeof data?.resolve === "function") {
            data.resolve(null);
          }
          return;
        }

        const event = data.event;
        const resolve = data.resolve;
        const eventId = Math.random().toString(36).substring(2);

        const newEvent = {
          id: eventId,
          title: "New Event",
          content: event.content || "",
          start: this.safeToISOString(event.start),
          end: this.safeToISOString(event.end),
          allDay: event.allDay || false,
          color: this.content.eventColor || "#FFFFFF",
          backgroundColor: this.content.primaryColor || "#1976d2",
          resizable: true,
          draggable: true,
          deletable: true,
          recurring: event.recurring || null,
          schedule: event.schedule !== undefined ? event.schedule : null,
          background: event.background || false,
          class: event.class || "",
          ...event, // pozwala na niestandardowe pola
        };

        this.$emit("trigger-event", {
          name: "event:create",
          event: {
            event: {
              ...newEvent,
              startISO: this.safeToISOString(event.start),
              endISO: this.safeToISOString(event.end),
            },
          },
        });

        if (typeof resolve === "function") {
          resolve(newEvent);
        }
      } catch (error) {
        console.error("Error in createEvent:", error);
        if (data && typeof data.resolve === "function") {
          data.resolve(null);
        }
      }
    },

    onEventDelete(payload) {
      if (!payload || !payload.event) {
        console.warn("Empty payload in onEventDelete");
        return;
      }

      const event = payload.event;

      this.$emit("trigger-event", {
        name: "event:delete",
        event: {
          event: {
            ...event,
            start: this.safeToISOString(event.start),
            end: this.safeToISOString(event.end),
            startISO: this.safeToISOString(event.start),
            endISO: this.safeToISOString(event.end),
          },
        },
      });
    },

    onEventDrop({ event, originalEvent, external }) {
      if (!event) {
        console.warn("Empty event in onEventDrop");
        return;
      }

      this.$emit("trigger-event", {
        name: "event:drop",
        event: {
          event: {
            ...event,
            eventSchedule: event.schedule || null,
            start: this.safeToISOString(event.start),
            end: this.safeToISOString(event.end),
            startISO: this.safeToISOString(event.start),
            endISO: this.safeToISOString(event.end),
          },
          originalEvent: originalEvent || {},
          external: external || false,
        },
      });
    },

    handleEventResizeEnd(payload) {
      console.log("EVENT RESIZE END:", payload);

      if (!payload || !payload.event) {
        console.error("Invalid payload received in handleEventResizeEnd");
        return;
      }

      const event = payload.event;

      this.$emit("trigger-event", {
        name: "event:resize:end",
        event: {
          event: {
            ...event,
            start: this.safeToISOString(event.start),
            end: this.safeToISOString(event.end),
            startISO: this.safeToISOString(event.start),
            endISO: this.safeToISOString(event.end),
          },
          overlaps: payload.overlaps || [],
        },
      });
    },

    onViewChange(viewInfo) {
      console.log("[VueCal] onViewChange received (ACTUAL structure):", viewInfo);

      // 1. Zaktualizuj zmienną WeWeb za pomocą wspólnej metody
      if (typeof this.setCurrentViewInfo === 'function') {
        const viewName = viewInfo?.id || null;
        const startDateISO = this.safeToISOString(viewInfo?.start);
        const endDateISO = this.safeToISOString(viewInfo?.end);
        const viewInfoForWeWebVariable = {
          view: viewName,
          startDate: startDateISO,
          endDate: endDateISO,
          firstCellDate: this.safeToISOString(viewInfo?.firstCellDate),
          lastCellDate: this.safeToISOString(viewInfo?.lastCellDate),
        };
        this.setCurrentViewInfo(viewInfoForWeWebVariable);
        console.log("[VueCal] Updated 'currentViewInfo' WeWeb variable via onViewChange:", viewInfoForWeWebVariable);
      }

      // 2. Logika emitowania zdarzenia trigger-event
      const viewName = viewInfo?.id || null;
      const startDateObj = viewInfo?.start instanceof Date ? viewInfo.start : (viewInfo?.start ? new Date(viewInfo.start) : null);
      const endDateObj = viewInfo?.end instanceof Date ? viewInfo.end : (viewInfo?.end ? new Date(viewInfo.end) : null);

      if (!startDateObj || !endDateObj) {
        console.warn("[VueCal] Nie można utworzyć obiektów Date dla trigger-event z viewInfo.start/end. Zdarzenie może zawierać nulle.", viewInfo);
      }

      this.$emit("trigger-event", {
        name: "view:change",
        event: {
          view: viewName,
          startDate: startDateObj,
          startDateISO: this.safeToISOString(startDateObj),
          endDate: endDateObj,
          endDateISO: this.safeToISOString(endDateObj),
        },
      });
      console.log("[VueCal] Emitted trigger-event 'view:change' from onViewChange.");
    },

    onSelectedDateUpdate(newDate) {
      if (!newDate) return;

      // Aktualizujemy lokalny stan
      this.selectedDate = newDate;

      // Aktualizujemy zmienną WeWeb
      if (typeof this.setSelectedDateInfo === 'function') {
        this.setSelectedDateInfo({
          date: newDate,
          dateISO: newDate.toISOString()
        });
      }

      // Emitujemy event dla WeWeb
      this.$emit("trigger-event", {
        name: "date:selected",
        event: {
          date: newDate,
          dateISO: newDate.toISOString()
        }
      });
    },

    onCellClick(cell, event) {
      if (cell && cell.start) {
        this.$emit("trigger-event", {
          name: "cell:click",
          event: {
            cell: {
              date: cell.start,
              dateISO: this.safeToISOString(cell.start),
              schedule: cell.schedule !== undefined ? cell.schedule : null,
            },
          },
        });
      }
    },

    onReady({ view }) {
      try {
        if (view && typeof view.scrollToCurrentTime === 'function') {
          view.scrollToCurrentTime();
        }
      } catch (error) {
        console.error('Error in onReady:', error);
      }
    }
  },

  mounted() {
    if (this.content.initialDate) {
      this.selectedDate = new Date(this.content.initialDate);
    }

    // Dodajemy inicjalizację currentViewInfo
    this.$nextTick(() => {
      if (this.$refs.vuecal) {
        const vuecal = this.$refs.vuecal;
        const currentDate = this.computedViewDate;
        const view = this.content.view || 'week';

        // Obliczamy prawidłowe daty start i end w zależności od widoku
        let startDate = new Date(currentDate);
        let endDate = new Date(currentDate);

        switch (view) {
          case 'week':
            // Ustawiamy na poniedziałek bieżącego tygodnia
            const day = startDate.getDay();
            const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
            startDate = new Date(startDate.setDate(diff));
            startDate.setHours(0, 0, 0, 0); // Ustawiamy na 00:00:00

            // Końcowa data to niedziela (start + 6 dni)
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999); // Ustawiamy na 23:59:59.999
            break;

          case 'month':
            // Pierwszy dzień miesiąca
            startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            startDate.setHours(0, 0, 0, 0);

            // Ostatni dzień miesiąca
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);
            break;

          case 'day':
            // Dla widoku dziennego
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;

          case 'year':
            // Pierwszy dzień roku
            startDate = new Date(startDate.getFullYear(), 0, 1);
            startDate.setHours(0, 0, 0, 0);

            // Ostatni dzień roku
            endDate = new Date(startDate.getFullYear(), 11, 31);
            endDate.setHours(23, 59, 59, 999);
            break;
        }

        // Tworzymy obiekt z informacjami o widoku
        const viewInfo = {
          id: view,
          start: startDate,
          end: endDate,
          firstCellDate: startDate,
          lastCellDate: endDate
        };

        // Aktualizujemy currentViewInfo
        if (typeof this.setCurrentViewInfo === 'function') {
          const viewInfoForWeWebVariable = {
            view: view,
            startDate: this.safeToISOString(startDate),
            endDate: this.safeToISOString(endDate),
            firstCellDate: this.safeToISOString(startDate),
            lastCellDate: this.safeToISOString(endDate),
          };
          this.setCurrentViewInfo(viewInfoForWeWebVariable);
        }
      }
    });
  },
  wrapperStyle() {
      return {
        height: this.content.height || "100%"}}
}
</script>

<template>
  <div class="vue-cal-wrapper" :style="wrapperStyle" :class="themeClasses">
  <vue-cal 
    ref="vuecal"
    :events="contentEvents"
    :views="availableViews"
    :view="defaultView"
    :schedules="contentSchedules"
    :style="vueCalStyles"
    :time="content.showEventTime !== false"
    :time-from="(parseInt(content.timeStart) || 8) * 60"
    :time-to="(parseInt(content.timeEnd) || 20) * 60"
    :time-step="parseInt(content.timeStep) || 30"
    :all-day-events="content.allDayEvents !== false"
    :hide-weekends="!!content.hideWeekends"
    :event-create-min-drag="15"
    :dark="content.darkMode"
    :editable-events="editableEvents"
    :min-event-width="content.minEventWidth || 0"
    :disable-days="content.disableDays || []"
    :snap-to-interval="parseInt(content.snapToInterval) || parseInt(content.timeStep) || 30"
    :event-overlap="content.allowEventOverlap !== false"
    :special-hours="processedSpecialHours"
    :time-cell-height="content.timeCellHeight || 40"
    :twelve-hour="!!content.twelveHour"
    events-on-month-view
   :date-picker="content.datePicker"
    :click-to-navigate="!!content.clickToNavigate"
    :view-date="computedViewDate"
    :selected-date="computedSelectedDate"
    :min-date="content.minDate || ''"
    :max-date="content.maxDate || ''"
    :week-numbers="!!content.weekNumbers"
    :today-button="content.todayButton !== false"
    :title-bar="content.titleBar !== false"
    :views-bar="content.viewsBar !== false"
    :watch-real-time="!!content.watchRealTime"
    :locale="locale"
    :timezone="content.timezone || 'auto'"
    time-at-cursor
    @ready="onReady"
    @event-click="handleEventClick"
    @event-create="createEvent"
    @event-delete="onEventDelete"
    @event-drop="onEventDrop"
    @view-change="onViewChange"
    @update:selectedDate="onSelectedDateUpdate"
    @event-resize-end="handleEventResizeEnd"
    @cell-click="onCellClick"
    :sm="content.sm"
    :xs="content.xs"
  >
    <template #schedule-heading="{ schedule }">
      <strong :style="`color: ${schedule.color}`">{{ schedule.label }}</strong>
    </template>
  </vue-cal>
  </div>
</template>

<style>

.vue-cal-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden; /* Pozwala vue-cal zarządzać scrollowaniem */
}
.vuecal {
  --vuecal-primary-color: #6e56cf;
  flex: unset !important;
}

.vuecal__event {
  border-radius: var(--vuecal-border-radius) !important;
  border: 1px solid var(--vuecal-event-border-color) !important;
  overflow: hidden;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* GLOBAL UNRELATED STYLES */
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.vuecal__event:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.vuecal__event-content {
  border-radius: var(--vuecal-border-radius);
}

.vuecal__schedule--heading {
  font-size: 11px;
  word-wrap: break-word;
  white-space: normal;
  line-height: 1.2;
  padding: 4px 2px;
  text-align: center;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vuecal__schedule--heading strong {
  word-wrap: break-word;
  white-space: normal;
  text-align: center;
  width: 100%;
}
.vuecal__cell{
  border-right: 1px solid var(--vuecal-border-color) !important;;
  
}

.vuecal__body .schedule1 {
  background-color: rgba(110, 86, 207, 0.2);
}

.vuecal__body .schedule {
  background-color: rgba(255, 255, 255, 0.7);
}

.vuecal__body .schedule3 {
  background-color: rgba(255, 243, 224, 0.7);
}

.vuecal__body .schedule4 {
  background-color: rgba(255, 235, 238, 0.7);
}
.vuecal__event.vuecal__event--background.background {
  background: repeating-linear-gradient(45deg, transparent 0 10px, #0000004f 10px 20px) !important;
  background-color: transparent !important;
  border: none !important;
}

</style>