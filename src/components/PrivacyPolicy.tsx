const SECTIONS = [
  {
    title: '1. 수집하는 개인정보 항목',
    content: `본 앱(맘마 계산기)은 별도의 회원가입 없이 사용할 수 있으며, 사용자의 개인정보를 수집·저장하지 않습니다.\n\n앱 사용 중 입력하는 이유식 양, 큐브 정보 등 모든 데이터는 사용자의 기기 내 브라우저 메모리에만 임시 저장되며, 서버로 전송되거나 외부에 공유되지 않습니다.`,
  },
  {
    title: '2. 개인정보의 수집 및 이용 목적',
    content: `본 앱은 이유식 재료 계산 및 정보 제공 서비스를 위해 운영되며, 사용자 개인정보를 수집하거나 이용하지 않습니다.`,
  },
  {
    title: '3. 제3자 제공',
    content: `본 앱은 사용자의 개인정보를 제3자에게 제공하지 않습니다.\n\n단, 앱 내 광고 서비스(쿠팡 파트너스)가 포함되어 있으며, 광고 제공 과정에서 해당 광고 플랫폼의 개인정보처리방침이 적용될 수 있습니다. 쿠팡 파트너스의 개인정보 처리에 대한 사항은 쿠팡 공식 개인정보처리방침을 참고하시기 바랍니다.`,
  },
  {
    title: '4. 쿠키 및 광고 식별자',
    content: `본 앱에 포함된 쿠팡 파트너스 광고는 광고 성과 측정을 위해 쿠키 또는 광고 식별자를 사용할 수 있습니다. 이는 개인을 직접 식별하지 않으며, 광고 최적화 목적으로만 사용됩니다.`,
  },
  {
    title: '5. 개인정보의 보유 및 이용 기간',
    content: `본 앱은 개인정보를 수집하지 않으므로 별도의 보유 기간이 없습니다. 앱을 종료하거나 브라우저를 닫으면 입력된 모든 데이터는 자동으로 삭제됩니다.`,
  },
  {
    title: '6. 이용자의 권리',
    content: `본 앱은 개인정보를 수집하지 않으므로 별도의 열람·수정·삭제 요청이 필요하지 않습니다.\n\n광고와 관련한 개인정보 관련 문의는 아래 연락처로 보내주시기 바랍니다.`,
  },
  {
    title: '7. 어린이 개인정보 보호',
    content: `본 앱은 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 본 앱은 영·유아 이유식 정보 제공을 목적으로 하며, 주 사용자는 보호자(성인)입니다.`,
  },
  {
    title: '8. 개인정보처리방침 변경',
    content: `본 방침은 관련 법령 또는 서비스 변경에 따라 수정될 수 있습니다. 변경 시 앱 내 공지를 통해 안내해 드립니다.\n\n시행일: 2026년 8월 25일`,
  },
  {
    title: '9. 문의',
    content: `개인정보 관련 문의 사항이 있으시면 아래로 연락해 주세요.\n\n관리자: 물결\n이메일: studio_mugyul@gmail.com`,
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center pt-2">
        <h2 className="text-2xl font-bold" style={{ color: '#2d2d2d' }}>개인정보처리방침</h2>
        <p className="text-sm mt-1" style={{ color: '#9b9b9b' }}>맘마 계산기 개인정보 보호 정책</p>
      </div>

      {/* Intro card */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: '#fff8f5', border: '1px solid #ffe8de' }}>
        <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>
          맘마 계산기(이하 "앱")는 사용자의 개인정보를 소중히 여기며, 관련 법령을 준수합니다.
          본 방침은 앱이 개인정보를 어떻게 처리하는지 안내합니다.
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-3">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#ffffff', border: '1px solid #f0ebe5' }}
          >
            <p className="font-bold text-sm mb-2" style={{ color: '#ff8c69' }}>{section.title}</p>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#444444' }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-center pb-2" style={{ color: '#c0b8b0' }}>
        본 방침은 2026년 8월 25일부터 적용됩니다.
      </p>
    </div>
  )
}
