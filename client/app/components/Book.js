import PropTypes from "prop-types"
import styled, {keyframes} from "styled-components"

const slideIn = keyframes`
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

const Container = styled.div`
  animation: ${slideIn} 0.8s cubic-bezier(0.39,0.575,0.565) both;
  display: grid;
  grid-template-columns: 38% 20% 5% 37%;
  padding: 2rem 0.188rem 1.625rem 1.688rem;
  border: solid 1px;
  border-radius: 4px;
  line-height: normal;
  trasition: background 0.40s linear;
  margin-right: 1rem;
  width: 250px;
  display: inline-block;
`