import { Linking } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Service = styled.View`
    flex: 1;
    padding: 0px 10px;
`;

const TermsLine = styled.ScrollView`
    margin-bottom: 20px;
`;

const TermsTitle = styled.Text`
    font-size: 18px;
    font-weight: 700;
    margin-top: 15px;
`;

const TermsText = styled.Text`
    margin-top: 15px;
`;

const TermsSemiText = styled.Text`
    margin-top: 15px;
`;

const Terms = () => {
    const onPressEmail = () => {
        Linking.openURL(`mailto:gg9297@gmail.com`);
    };
    return (
        <Service>
            <TermsLine>
                <TermsTitle>제1조 목적</TermsTitle>
                <TermsText>
                    본 약관은 에스캐처(이하 ‘회사’)가 제공하는 “IDCatch” 서비스 이용과 관련하여 회사, 인증기관, 사용자 간의 권리, 의무 및
                    책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </TermsText>
                <TermsTitle>제2조 약관의 효력 및 변경</TermsTitle>
                <TermsText>
                    ① 본 약관의 내용은 서비스의 화면에 게시하거나 기타의 방법으로 공지하고, 본 약관에 동의한 모든 이용자에게 그 효력이
                    발생합니다.
                </TermsText>
                <TermsText>
                    ② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 본 약관이 변경되는 경우 회사는
                    변경사항을 시행일자 15일 전부터 여러분에게 통지하는 것을 원칙으로 하며, 부득이한 경우로 여러분에게 불리한 내용의 변경이
                    있을 경우 그 시행일자 30일 전부터 계정에 등록된 휴대폰번호로 SMS를 발송하여 개별적으로 알려 드립니다.
                </TermsText>
                <TermsText>
                    ③ 회사가 전 항에 따라 공지 또는 통지를 함에 따라 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지
                    아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 여러분의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로
                    봅니다.
                </TermsText>
                <TermsText>④ 여러분은 변경된 약관에 대하여 거부의사를 표시함으로써 이용 서비스의 해지를 선택할 수 있습니다.</TermsText>
                <TermsText>
                    ⑤ 본 약관은 여러분이 본 약관에 동의한 날로부터 이용 서비스의 해지 시까지 적용하는 것을 원칙으로 합니다. 단, 본 약관의
                    일부 조항은 이용 서비스의 해지 후에도 유효하게 적용될 수 있습니다.
                </TermsText>
                <TermsTitle>제3조 약관 외 준칙</TermsTitle>
                <TermsText>
                    ① 회사는 필요한 경우 개별 IDCatch 서비스에 관하여 적용될 사항을 위해 개별약관이나 이용준칙을 정하여 운영할 수 있으며,
                    해당 내용은 IDCatch 서비스 내 또는 별도의 SMS 발송 등을 통해 공지합니다.
                </TermsText>
                <TermsText>
                    ② 본 약관에서 정하지 아니한 사항과 본 약관의 해석에 관하여는 「약관의 규제에 관한 법률」,「정보통신망이용촉진 및
                    정보보호 등에 관한 법률」 등 관련 법령 또는 상 관례에 따릅니다.
                </TermsText>
                <TermsTitle>제4조 통합서비스 가입의 제한</TermsTitle>
                <TermsText>
                    ① 이용자에게 회사는 원칙적으로 서비스 가입을 승낙합니다. 다만, 회사는 아래 각 호의 경우에는 그 사유가 해소될 때까지
                    계정의 서비스 이용을 제한하거나 탈퇴처리 할 수 있습니다. 특히 만 19세 미만 이용자인 경우 해당 서비스 이용을 제한합니다.
                </TermsText>
                <TermsSemiText>1. 다른 사람의 명의의 휴대폰 번호 등 개인정보를 이용하여 가입하려고 한 경우 </TermsSemiText>
                <TermsSemiText>2. 서비스 제공 설비 용량에 현실적인 여유가 없는 경우</TermsSemiText>
                <TermsSemiText>3. 서비스 제공을 위한 기술적인 부분에 문제가 있다고 판단되는 경우</TermsSemiText>
                <TermsSemiText>4. 기타 회사가 재정적, 기술적으로 필요하다고 인정하는 경우</TermsSemiText>
                <TermsSemiText>
                    5. 회사로부터 서비스 이용정지 조치 등을 받은 자가 그 조치기간에 서비스 이용을 임의로 탈퇴 처리하고 재가입을 신청하는
                    경우
                </TermsSemiText>
                <TermsSemiText>6. 기타 관련 법령에 위배되거나 세부지침 등 회사가 정한 기준에 반하는 경우</TermsSemiText>
                <TermsText>
                    ② 만약, 이용자가 위 조건에 위반하여 서비스에 가입한 것으로 판명된 때에는 회사는 즉시 여러분의 서비스 이용을 정지시키거나
                    계정을 삭제하는 등 적절한 제한을 할 수 있습니다.
                </TermsText>
                <TermsTitle>제5조 서비스 이용 절차</TermsTitle>
                <TermsText>
                    ① 회사는 IDCatch 서비스 가입자가 본 약관 및 이용하고자 하는 서비스의 종류에 따라 개별 약관이 존재하는 경우 그 개별
                    약관에 동의하고 본인확인을 거쳐 PIN 또는 생체인식 정보 등록을 마친 후, IDCatch 서비스의 이용을 승낙함으로써 서비스
                    이용계약을 체결하는 것을 원칙으로 합니다.
                </TermsText>
                <TermsText>
                    ② 이용자는 IDCatch 서비스 이용에 필요한 정보를 회사 또는 인증기관에 제공함으로써 IDCatch 서비스를 이용할 수 있습니다.
                    예를 들어 본인인증 서비스의 경우 사용자는 휴대폰 본인확인 정보, 신분증 정보 등을 본인 인증기관에 제공하여 인증을
                    받음으로써 이용할 수 있습니다.
                </TermsText>
                <TermsText>
                    ③ IDCatch 서비스 이용에 필요한 정보는 서비스 내용 변경, 회사나 인증기관 또는 이용기관의 정책 변경 및 관련 법령에 따라
                    달라질 수 있습니다.
                </TermsText>
                <TermsText>
                    ④ 사용자가 제1항이나 제2항에서 요청하는 정보를 사실대로 정확하게 제공하지 않은 경우 사전적 또는 사후적으로 서비스 이용에
                    제한을 받을 수 있습니다.
                </TermsText>
                <TermsText>
                    ⑤ 회사는 사용자가 본 조의 절차에 위반하여 이용신청을 한 경우 이로 인해 발생한 피해에 대하여 책임을 지지 않습니다.
                </TermsText>
                <TermsTitle>제6조 개인정보의 보호 및 사용</TermsTitle>
                <TermsText>
                    ① 회사는 관련 법령이 정하는 바에 따라 사용자의 개인정보를 보호하기 위해 노력하며, 개인정보의 보호 및 사용에 대해서는
                    관련 법령에 따릅니다.
                </TermsText>
                <TermsText>
                    ② 이용자 저장 데이터는 이용자의 모바일 기기에 안전한 방식으로 저장됩니다. 회사에서는 이용자의 별도 동의 없이는 이용자
                    저장 데이터를 수집, 보관, 관리하지 않으며, 회사는 이용자 저장 데이터에 대한 폐기, 복구 의무가 없습니다.
                </TermsText>
                <TermsText>
                    ③ IDCatch 이용자가 신용 증명을 받기 위해 인증기관에 직접 제출하는 개인정보의 수집 및 보관에 대한 책임은 인증기관에
                    있으며 회사는 이에 대한 일체의 책임을 부담하지 않습니다.
                </TermsText>
                <TermsText>
                    ④ 회사는 이용자의 귀책사유로 사용자 저장 데이터 및 개인정보가 유출되어 발생한 피해에 대하여 책임을 지지 않습니다.
                </TermsText>
                <TermsTitle>제7조 회사의 의무</TermsTitle>
                <TermsText>
                    ① 회사는 관련 법령 및 본 약관에서 정하는 권리의 행사 및 의무의 이행을 신의에 따라 성실하게 준수합니다.
                </TermsText>
                <TermsText>
                    ② 회사는 이용자가 안전하게 IDCatch 서비스를 이용할 수 있도록 개인정보(사용자 저장 데이터 포함)보호를 위해 필요한
                    보안시스템을 갖추어야 합니다. 회사는 사용자의 개인정보가 사용자의 동의없이 제3자에게 제공되지 않도록 합니다.
                </TermsText>
                <TermsText>
                    ③ 회사는 지속적이고 안정적인 IDCatch 서비스의 제공을 위하여 최선을 다하여 노력합니다. 서비스 또는 설비에 장애가 생겼을
                    경우 천재지변, 비상사태, 현재의 기술로는 해결이 불가능한 장애나 결함 등 부득이한 사유가 없는 한 지체 없이 이를 수리 또는
                    복구하도록 최선의 노력을 다합니다.
                </TermsText>
                <TermsText>
                    ④ 회사는 IDCatch 서비스 이용과 관련하여 이용자가 장애나 개선사항에 대해 회사에 전달할 수 있는 방법을 서비스 내에
                    고지합니다.
                </TermsText>
                <TermsTitle>제8조 이용자의 의무</TermsTitle>
                <TermsText>
                    ① 이용자는 본 약관 및 개정약관, 회사가 IDCatch 서비스 화면에서 고지하는 내용을 확인하고 준수하여야 하며, 본 약관,
                    개정약관 및 고지 내용을 위반하거나 이행하지 아니하여 발생하는 손실 및 손해에 대하여 책임을 부담합니다.
                </TermsText>
                <TermsText>
                    ② 이용자는 자신의 명의가 도용되거나 제3자에게 부정하게 사용된 것을 인지한 경우 즉시 그 사실을 회사에 통보하여야 합니다.
                </TermsText>
                <TermsText>
                    ③ 이용자는 IDCatch 서비스를 이용하여 얻은 정보를 회사의 사전 동의 없이 영리목적으로 이용하거나 제3자에게 이용하게 하는
                    행위를 할 수 없으며, IDCatch 서비스의 이용권한 및 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없습니다.
                </TermsText>
                <TermsText>
                    ④ 이용자는 회사가 IDCatch 서비스를 안전하게 제공할 수 있도록 회사에 협조하여야 하며, 회사가 이용자의 본 약관 위반행위를
                    발견하여 회원에게 해당 위반행위에 대하여 소명을 요청할 경우 회사의 요청에 적극 응하여야 합니다.
                </TermsText>
                <TermsTitle>제9조 이용자의 금지행위</TermsTitle>
                <TermsText>
                    ① 회사는 IDCatch 서비스의 신뢰성을 제공하고 안전한 서비스 이용이 이루어 질 수 있도록 아래와 같은 사용자의 행위를
                    금지합니다.
                </TermsText>
                <TermsSemiText>
                    1. 회사가 제공하는 IDCatch 서비스 이용방법에 의하지 아니하고 비정상적인 방법으로 서비스를 이용하거나 시스템에 접근하는
                    행위
                </TermsSemiText>
                <TermsSemiText>2. 회사에서 제공하는 서비스를 본래의 이용 목적 이외의 용도로 사용하는 행위</TermsSemiText>
                <TermsSemiText>
                    3. 타인의 명의, 휴대폰 정보, 생체인식 정보, 신분증 등을 도용하여 IDCatch 서비스를 이용신청하거나 이용하는 행위
                </TermsSemiText>
                <TermsSemiText>4. 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</TermsSemiText>
                <TermsSemiText>5. 회사 및 기타 제3자의 저작권, 초상권 등 지적재산권에 대한 침해행위</TermsSemiText>
                <TermsSemiText>
                    6. 회사가 제공하는 IDCatch 서비스를 이용하여 얻은 회사 또는 제3자의 정보를 정보 소유자의 사전 동의 없이 복제 또는
                    유통시키거나 상업적으로 이용하는 행위
                </TermsSemiText>
                <TermsSemiText>
                    7. 회사의 동의 없이 영리, 영업, 광고, 정치활동, 불법선거운동 등을 목적으로 서비스를 이용하는 행위
                </TermsSemiText>
                <TermsSemiText>8. 기타 공공질서 및 미풍양속을 위반하거나 불법적, 부당한 행위 및 법령에 위배되는 행위</TermsSemiText>
                <TermsText>
                    ② 회사는 사용자가 본 조의 금지행위를 행하는 경우 IDCatch 서비스 이용을 제한할 수 있으며, 회사는 필요한 경우 사용자의
                    금지행위 사실을 관련 정부기관 또는 사법기관에 통지할 수 있습니다.
                </TermsText>
                <TermsTitle>제10조 서비스의 변경 및 중단</TermsTitle>
                <TermsText>
                    ① 회사는 다음 각 호의 경우에는 서비스의 전부 또는 일부를 일시 중단할 수 있습니다. 이 경우 회사는 사전에 그 정지의 사유와
                    기간을 구글 플레이스토어 또는 애플 앱 스토어나 IDCatch 초기화면에 공지합니다. 다만, 사전에 공지할 수 없는 부득이한
                    사정이 있는 경우 사후에 공지할 수 있습니다.
                </TermsText>
                <TermsSemiText>
                    1. 회사 또는 인증기관의 시스템 정기점검, 서버의 증설 및 교체, 네트워크의 불안정 등의 시스템 운영상 필요한 경우
                </TermsSemiText>
                <TermsSemiText>
                    2. 정전, 서비스 설비의 장애, 서비스 이용 폭주, 기간통신사업자의 설비 보수 또는 장애 및 점검 등으로 인하여 정상적인
                    서비스 제공이 불가능한 경우
                </TermsSemiText>
                <TermsSemiText>
                    3. 천재지변, 전쟁, 폭동, 테러, 해킹, DDOS, 또는 이에 준하는 국가비상사태 등 회사가 통제할 수 없는 상황이 발생한 경우
                </TermsSemiText>
                <TermsText>
                    ② IDCatch 서비스는 관련 법령이나 정책 변경에 따라 달라질 수 있습니다. 회사는 IDCatch 서비스 제공을 위해 계약을 체결하고
                    있는 이용기관 등의 시스템 운영 상황이나 계약 체결 상황에 따라서 IDCatch 서비스 운영상 상당한 이유가 있는 경우에는
                    IDCatch 서비스의 전체 또는 일부의 제공을 일시적으로 중단할 수 있습니다.
                </TermsText>
                <TermsText>
                    ③ 회사는 파산 신청, 기업회생절차 개시 신청, 현저한 수익 악화 등 정상적인 영업활동이 곤란하여 IDCatch 서비스를 지속할 수
                    없는 때에는 서비스 이용 가입자에게 이를 통지한 날로부터 30일이 경과한 때부터 IDCatch 서비스를 중단할 수 있습니다.
                </TermsText>
                <TermsTitle>제11조 정보의 제공 및 광고의 게재</TermsTitle>
                <TermsText>
                    ① 회사는 이용자가 서비스 이용을 위해 필요하다고 인정되는 다양한 정보를 IDCatch 서비스 내에 게시하거나 기타 방법으로
                    사용자에게 제공할 수 있습니다.
                </TermsText>
                <TermsText>
                    ② 회사는 본 서비스 등을 유지하기 위하여 광고를 게재할 수 있으며, 사용자는 서비스 이용 시 노출되는 광고게재에 대하여
                    동의합니다.
                </TermsText>
                <TermsTitle>제12조 손해배상</TermsTitle>
                <TermsText>
                    ① 회사 또는 이용자는 본 약관을 위반하여 상대방에게 손해를 입힌 경우에는 그 손해를 배상할 책임이 있습니다. 다만, 고의
                    또는 과실이 없는 경우에는 그러하지 아니 합니다.
                </TermsText>
                <TermsText>
                    ② 이용자가 서비스를 이용함에 있어 행한 불법행위 또는 본 약관을 위반한 행위로 회사가 당해 이용자 외의 제3자로부터
                    손해배상청구 또는 소송 등 각종 이의제기를 받는 경우 당해 이용자는 자신의 책임과 비용으로 회사를 면책시켜야 하며, 회사가
                    면책되지 못한 경우 당해 이용자는 그로 인하여 회사에 발생한 모든 손해를 배상할 책임이 있습니다.
                </TermsText>
                <TermsTitle>제13조 분쟁 처리 및 조정 방안</TermsTitle>
                <TermsText>
                    ① 이용자는 회사에 정당한 의견이나 불만사항을 제기하고 IDCatch에서 제공되는 실명인증 서비스로 인한 손해배상 청구를 하는
                    경우에는 회사는 해당 청구가 접수된 날부터 30일 이내에 요청한 내용을 파악하여 조사 또는 처리 결과를 이용자에게
                    안내합니다. 단, 회사는 효율적인 처리를 위하여 이용자에게 관련 자료 제출 등을 요구할 수 있습니다.
                </TermsText>
                <TermsSemiText>
                    이용자는 회사에 IDCatch에서 제공되는 본인인증 서비스 이용과 관련한 분쟁 처리를 요구할 수 있습니다.
                </TermsSemiText>
                <TermsSemiText onPress={onPressEmail}>- 이메일 : gg9297@gmail.com</TermsSemiText>
                <TermsTitle>제14조 회사의 면책</TermsTitle>
                <TermsText>
                    ① 회사는 이용자와 인증기관 상호간의 거래에 대한 어떠한 책임도 부담하지 않으며, 회사의 귀책사유가 아닌 사유로 발생한
                    서비스의 이용장애에 대하여 책임을 부담하지 않습니다. 또한 회사는 이용자 또는 인증기관의 귀책사유로 인하여 발생한 손해에
                    대하여 회사의 귀책 사유가 없는 경우 책임을 부담하지 않습니다.
                </TermsText>
                <TermsText>
                    ② 이용자가 자신의 개인정보, 사용자 저장 데이터, 비밀번호 (생체등록 정보 포함), IDCatch 서비스 이용 관련 정보 등을
                    타인에게 제공하거나, 사용자의 관리소홀로 유출됨으로써 발생하는 피해에 대해서 회사는 책임을 지지 않습니다.
                </TermsText>
                <TermsText>
                    ③ 회사는 이용자가 본인의 모바일 기기 내에 있는 사용자 저장 데이터를 삭제하여 서비스 이용에 제한이 되는 경우 회사는 이에
                    대해 책임을 지지 않습니다.
                </TermsText>
                <TermsText>
                    ④ 회사는 인증기관이 신용 증명을 검증하는 과정에서 인증기관의 고의 또는 과실로 인한 서비스의 이용장애 및 이로 인해 발생한
                    피해에 대해서 책임을 부담하지 않습니다.
                </TermsText>
                <TermsText>
                    ⑤ 회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 기타 이에 준하는 사유로 발생한 손해에 대하여 책임을 지지
                    않습니다. 다만, 회사의 고의 또는 과실에 의한 경우에는 그러하지 아니합니다.
                </TermsText>
                <TermsText>
                    ⑥ 이용자가 모바일 기기의 변경, 모바일 기기의 번호 변경, 운영체제(OS) 버전의 변경, 해외 로밍, 통신사 변경 등으로 인해
                    콘텐츠 전부나 일부의 기능을 이용할 수 없는 경우 회사는 이에 대해 책임을 지지 않습니다.
                </TermsText>
                <TermsTitle>제15조 재판권 및 준거법</TermsTitle>
                <TermsText>
                    이 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 회사와 이용자 간에 발생한 분쟁으로 소송이 제기되는 경우에는 법령에
                    정한 절차에 따른 법원을 관할 법원으로 합니다.
                </TermsText>
            </TermsLine>
        </Service>
    );
};

export default Terms;
