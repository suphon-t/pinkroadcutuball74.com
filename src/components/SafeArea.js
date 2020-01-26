import styled from "styled-components"

function genSafeArea(condition, side, min) {
  if (condition) {
    return `padding-${side}: max(${min || 0}px, env(safe-area-inset-${side}));`
  } else {
    return ''
  }
}

export default styled.div`
  ${({ min, top, all }) => genSafeArea(top || all, 'top', min)}
  ${({ min, left, all }) => genSafeArea(left || all, 'left', min)}
  ${({ min, bottom, all }) => genSafeArea(bottom || all, 'bottom', min)}
  ${({ min, right, all }) => genSafeArea(right || all, 'right', min)}
`
