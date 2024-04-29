import {
  Slider,
  Rail,
  Handles,
  Tracks,
  Ticks,
  CustomMode,
} from "react-compound-slider";
import { useMemo } from "react";
import { format } from "date-fns";
import { Tick } from "./lib/components/Tick";
import { scaleTime } from "d3-scale";
import { Track } from "./lib/components/Track";
import { Handle } from "./lib/components/Handle";
import { SliderRail } from "./lib/components/SliderRail";
import { getFormattedBlockedIntervals } from "./lib/helpers";

export type DateValuesType = readonly number[];

function formatTick(ms: number | Date) {
  return format(new Date(ms), "HH:mm", {
    weekStartsOn: 1,
  });
}

export interface TimelineRange {
  step: number;
  ticksCount: number;
  values: DateValuesType;
  disabledIntervals?: any[];
  timelineInterval: [Date, Date];
  mode: 1 | 2 | 3 | CustomMode | undefined;
  onChange: (values: DateValuesType) => void;
  onUpdateCallback: (p: { error: boolean; time: readonly Date[] }) => void;
}

export const TimelineRange = (props: TimelineRange) => {
  const disabledIntervals = useMemo(() => {
    return getFormattedBlockedIntervals(
      props.disabledIntervals,
      props.timelineInterval
    );
  }, [props.disabledIntervals, props.timelineInterval]);

  const dateTicks = scaleTime()
    .domain(props.timelineInterval)
    .ticks(props.ticksCount)
    .map((t) => +t);

  const domain = props.timelineInterval.map((t) => Number(t));

  const checkIsSelectedIntervalNotValid = (
    [start, end]: DateValuesType,
    source: any,
    target: any
  ) => {
    const { value: startInterval } = source;
    const { value: endInterval } = target;

    if (
      (startInterval > start && endInterval <= end) ||
      (startInterval >= start && endInterval < end)
    )
      return true;
    if (start >= startInterval && end <= endInterval) return true;

    const isStartInBlockedInterval =
      start > startInterval && start < endInterval && end >= endInterval;
    const isEndInBlockedInterval =
      end < endInterval && end > startInterval && start <= startInterval;

    return isStartInBlockedInterval || isEndInBlockedInterval;
  };

  const onUpdate = (newTime: DateValuesType) => {
    const { onUpdateCallback } = props;

    if (disabledIntervals?.length) {
      const isValuesNotValid = disabledIntervals.some(({ source, target }) =>
        checkIsSelectedIntervalNotValid(newTime, source, target)
      );
      const formattedNewTime = newTime.map((t) => new Date(t));
      onUpdateCallback({ error: isValuesNotValid, time: formattedNewTime });
      return;
    }

    const formattedNewTime = newTime.map((t) => new Date(t));
    onUpdateCallback({ error: false, time: formattedNewTime });
  };

  return (
    <div>
      <div className="react_time_range__time_range_container">
        <Slider
          domain={domain}
          step={props.step}
          mode={props.mode}
          onUpdate={onUpdate}
          values={props.values}
          onChange={props.onChange}
          rootStyle={{ position: "relative", width: "100%" }}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <>
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </>
            )}
          </Handles>

          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <>
                {tracks?.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    // error={error}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </>
            )}
          </Tracks>

          {disabledIntervals.length && (
            <Tracks left={false} right={false}>
              {({ getTrackProps }) => (
                <>
                  {disabledIntervals.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      disabled
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </>
              )}
            </Tracks>
          )}

          <Ticks values={dateTicks}>
            {({ ticks }) => (
              <>
                {ticks.map((tick) => (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    count={ticks.length}
                    format={formatTick}
                  />
                ))}
              </>
            )}
          </Ticks>
        </Slider>
      </div>
    </div>
  );
};
