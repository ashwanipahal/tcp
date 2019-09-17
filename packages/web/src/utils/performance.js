export function mark(name) {
  if (process.env.PERF_TIMING && name) {
    performance.mark(name);
  }
}

export function measure(name, ...args) {
  if (process.env.PERF_TIMING && name) {
    // Try because "name" needs to match an existing mark
    try {
      performance.measure(name, ...args);
    } catch (err) {
      console.log(err);
    }
  }
}

export default {
  mark,
  measure,
};
