import React from 'react'
import styled from 'styled-components/native'

const Service = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TermsText = styled.Text``

const Terms = () => (
  <Service>
    <TermsText>서비스 약관</TermsText>
  </Service>
)

export default Terms
