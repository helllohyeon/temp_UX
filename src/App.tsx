import type { ReactNode } from 'react'

function Shield() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function Page({
  number,
  children,
  title,
}: {
  number: number
  children: ReactNode
  title?: string
}) {
  return (
    <section className="page">
      <header className="page-header">
        <div className="page-brand"><Shield /><strong>L-Supply Guard</strong></div>
        <span>{title ?? '취약점 점검 결과'}</span>
      </header>
      <div className="page-body">{children}</div>
      <footer className="page-footer">
        <span>CONFIDENTIAL · 내부 검토용</span>
        <b>{String(number).padStart(2, '0')}</b>
      </footer>
    </section>
  )
}

function SectionTitle({ number, children, description }: { number: string; children: ReactNode; description?: string }) {
  return (
    <div className="section-title">
      <span>{number}</span>
      <div><h2>{children}</h2>{description && <p>{description}</p>}</div>
    </div>
  )
}

function App() {
  return (
    <main className="document">
      <div className="print-toolbar">
        <div><strong>취약점 점검 결과</strong><span>A4 보고서 미리보기 · 6페이지</span></div>
        <button onClick={() => window.print()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/></svg>
          PDF로 출력
        </button>
      </div>

      <Page number={1}>
        <div className="cover-intro">
          <div className="report-kicker">OPEN SOURCE VULNERABILITY REPORT</div>
          <h1>취약점<br />점검 결과</h1>
          <p>comment 프로젝트의 오픈소스 의존성과<br />실제 코드 사용 경로를 분석했습니다.</p>
        </div>

        <div className="cover-status">
          <span>점검 결과</span>
          <strong>즉시 조치가 필요한<br />취약점이 발견되었습니다.</strong>
          <div className="cover-severity"><b>CRITICAL</b><em>1건</em></div>
        </div>

        <div className="cover-meta">
          <div><span>PROJECT</span><strong>comment</strong></div>
          <div><span>ANALYSIS</span><strong>OSV 버전 대조 완료</strong></div>
          <div><span>RUN ID</span><strong>39c0af38...ec3cf00</strong></div>
          <div><span>DATE</span><strong>2025. 02. 14</strong></div>
        </div>
      </Page>

      <Page number={2} title="점검 요약">
        <SectionTitle number="01" description="이번 점검의 범위와 주요 결과를 요약합니다.">점검 대상 및 결과</SectionTitle>

        <div className="executive-alert">
          <div className="alert-label">결론</div>
          <h3>PyYAML 5.3.1에서<br /><b>실제 영향 경로 1건</b>을 확인했습니다.</h3>
          <p>외부 HTTP 요청 본문이 별도 검증 없이 취약 API로 전달됩니다. 권장 버전으로 업데이트하고 동일 범위를 다시 점검하세요.</p>
        </div>

        <div className="summary-grid">
          <div><span>점검 구성요소</span><strong>2<small>개</small></strong><p>OSV 조회 가능 2개</p></div>
          <div><span>버전 일치 후보</span><strong>1<small>건</small></strong><p>Critical 1건</p></div>
          <div className="red"><span>영향 있음</span><strong>1<small>건</small></strong><p>판단 유보 0건</p></div>
          <div><span>분석한 소스</span><strong>3<small>개</small></strong><p>건너뛴 소스 0개</p></div>
        </div>

        <h3 className="subheading">점검 범위</h3>
        <table className="data-table">
          <tbody>
            <tr><th>의존성 파일</th><td><code>requirements.txt</code></td></tr>
            <tr><th>조회 출처</th><td>OSV 공개 취약점 데이터베이스</td></tr>
            <tr><th>분석 방식</th><td>규칙 기반 정적 분석 · 패키지 이름 기준 연결</td></tr>
            <tr><th>버전 기준</th><td>의존성 파일에 명시된 고정 버전</td></tr>
          </tbody>
        </table>

        <div className="reading-guide">
          <strong>보고서 판정 기호</strong>
          <div><b className="o">O</b><span><strong>영향 있음</strong>발생 조건 충족 확인</span></div>
          <div><b className="x">X</b><span><strong>영향 없음</strong>배제 근거 확인</span></div>
          <div><b className="hold">△</b><span><strong>판단 유보</strong>추가 확인 필요</span></div>
        </div>

        <div className="scope-note">
          <strong>분석 범위 안내</strong>
          <p>설치된 패키지와 의존성 간선은 별도로 확인하지 않았습니다. 배포 결과물, 동적 호출, 운영망 노출 및 접근 권한은 추가 확인이 필요합니다.</p>
        </div>
      </Page>

      <Page number={3} title="취약점 상세">
        <SectionTitle number="02" description="공개 권고문과 실제 코드 사용 경로를 함께 판정했습니다.">취약점 및 판정 근거</SectionTitle>

        <article className="vulnerability">
          <div className="vuln-top">
            <div>
              <span className="critical-badge">CRITICAL · 9.8</span>
              <h3>CVE-2020-14343</h3>
              <p>Improper Input Validation in PyYAML</p>
            </div>
            <div className="impact-stamp"><small>프로젝트 영향</small><strong>영향 있음</strong><b>O</b></div>
          </div>

          <div className="version-strip">
            <div><span>현재 버전</span><strong>PyYAML <b>5.3.1</b></strong></div>
            <em>→</em>
            <div><span>권장 버전</span><strong className="safe">5.4 이상</strong></div>
            <div><span>조치 등급</span><strong className="urgent">긴급 · 24시간</strong></div>
          </div>
        </article>

        <div className="judgement">
          <span>판정 요약</span>
          <strong>등록된 요청 처리기가 HTTP 요청 본문을 그대로 취약 API에 전달합니다.</strong>
          <code>registered_request_body</code>
        </div>

        <h3 className="subheading">확인한 사실</h3>
        <ol className="evidence-list">
          <li><b>1</b><div><strong>취약 버전 사용 확인</strong><p><code>requirements.txt · line 1</code>에서 pyyaml 5.3.1 선언을 확인했습니다.</p></div></li>
          <li><b>2</b><div><strong>공개 권고문의 영향 범위에 포함</strong><p>영향 범위는 <code>introduced 0 / fixed 5.4</code>이며 사용 버전이 포함됩니다.</p></div></li>
          <li><b>3</b><div><strong>영향 API 호출 확인</strong><p><code>document.py:3</code>에서 <code>yaml.load</code> 기본 인자 호출을 확인했습니다.</p></div></li>
          <li><b>4</b><div><strong>외부 입력 전달 경로 확인</strong><p><code>intake.py:7–8</code>의 HTTP 요청 본문이 해당 함수로 전달됩니다.</p></div></li>
        </ol>

        <div className="source-note">
          <span>점수 출처</span><strong>GHSA-8q59-q68h-6hv4</strong>
          <span>의존성</span><strong>직접 의존성</strong>
        </div>
      </Page>

      <Page number={4} title="코드 분석">
        <SectionTitle number="03" description="외부 입력이 취약 API까지 전달되는 실제 코드 흐름입니다.">입력 전달 경로</SectionTitle>

        <div className="flow-summary">
          <span>분석 결과</span>
          <h3>검증되지 않은 요청 본문이<br />PyYAML 로더로 전달됩니다.</h3>
          <p>Flask 앱에 등록된 요청 처리 경로를 기준으로 정적 분석했습니다.</p>
        </div>

        <div className="code-flow vertical">
          <div><span>1 · 외부 입력</span><strong>HTTP 요청 본문 읽기</strong><code>intake.py:7 · incoming.get_data()</code></div>
          <b>↓</b>
          <div><span>2 · 함수 전달</span><strong>read_note(data)</strong><code>intake.py:8 · 동일 값의 로컬 함수 인자 전달</code></div>
          <b>↓</b>
          <div className="risk"><span>3 · 취약 API 호출</span><strong>yaml.load(data)</strong><code>document.py:3 · 기본 인자 호출</code></div>
        </div>

      </Page>

      <Page number={5} title="분석 범위 및 한계">
        <SectionTitle number="03-1" description="정적 분석에서 확인한 패키지별 호출 후보와 추가 확인 사항입니다.">분석 범위 및 한계</SectionTitle>

        <h3 className="subheading">패키지별 호출 후보</h3>
        <table className="data-table call-table">
          <thead><tr><th>패키지</th><th>위치</th><th>호출 내용</th></tr></thead>
          <tbody>
            <tr><td>flask 3.1.3</td><td><code>intake.py:4</code></td><td>모듈 → Area</td></tr>
            <tr><td>flask 3.1.3</td><td><code>intake.py:7</code></td><td>accept_note → incoming.get_data</td></tr>
            <tr><td>flask 3.1.3</td><td><code>server.py:4</code></td><td>make_server → Server</td></tr>
            <tr><td>pyyaml 5.3.1</td><td><code>document.py:3</code></td><td>read_note → consume</td></tr>
          </tbody>
        </table>

        <div className="analysis-limit">
          <strong>정적 분석의 한계</strong>
          <p>운영망 노출, 접근 권한 및 실제 피해 가능성은 별도 확인이 필요합니다. 검토한 Python 3 배포 소스 기준이며, 운영 환경에서 별도 패치한 빌드를 사용하는지는 확인되지 않았습니다.</p>
        </div>

        <div className="analysis-limit secondary">
          <strong>추가 확인 대상</strong>
          <p>동일 패키지의 여러 버전, 동적 호출, 실행 시 선택되는 분기와 실제 배포 상태는 이번 정적 분석만으로 확정할 수 없습니다. 운영 환경에서 표시된 사용 위치와 접근 조건을 확인하세요.</p>
        </div>

        <div className="analysis-facts">
          <div><span>호출 구조 분석</span><strong>소스 3개</strong><p>생략 0개</p></div>
          <div><span>패키지 권고문</span><strong>8개 대조</strong><p>OSV 공개 DB 기준</p></div>
          <div><span>판정 방식</span><strong>규칙 기반</strong><p>패키지 이름 기준 연결</p></div>
        </div>
      </Page>

      <Page number={6} title="조치 및 검증">
        <SectionTitle number="04" description="취약 버전 변경 후 동일한 범위에서 해소 여부를 확인합니다.">조치 가이드</SectionTitle>

        <div className="action-hero">
          <span>RECOMMENDED ACTION</span>
          <h3>PyYAML을 <b>5.4 이상</b>으로<br />업데이트하세요.</h3>
          <p><code>requirements.txt</code>의 고정 버전을 변경하고 깨끗한 환경에서 의존성을 다시 설치합니다.</p>
          <pre><span>- pyyaml==5.3.1</span>{'\n'}<b>+ pyyaml&gt;=5.4</b></pre>
        </div>

        <SectionTitle number="05" description="아래 순서대로 적용 결과를 검증하세요.">적용 및 검증 계획</SectionTitle>
        <ol className="verification-list">
          <li><b>01</b><div><strong>버전 변경</strong><p>별도 브랜치에서 버전을 변경하고 잠금 파일을 재생성합니다.</p></div></li>
          <li><b>02</b><div><strong>회귀 테스트</strong><p>요청 본문 처리 기능의 회귀 테스트와 빌드를 실행합니다.</p></div></li>
          <li><b>03</b><div><strong>SBOM 재생성</strong><p>업데이트된 환경을 기준으로 새 SBOM을 생성합니다.</p></div></li>
          <li><b>04</b><div><strong>재점검 및 종결</strong><p>동일 범위에서 권고문 해소와 신규 취약점 유무를 확인합니다.</p></div></li>
        </ol>

        <div className="final-note">
          <strong>종결 기준</strong>
          <p>조치 후 동일 범위에서 취약점 해소가 확인되면 종결합니다. 조치 전 실행 또는 근거 파일이 누락된 재점검은 같은 티켓과 최초 마감을 유지합니다.</p>
        </div>

        <div className="approval">
          <div><span>검토자</span><i /></div>
          <div><span>조치 담당자</span><i /></div>
          <div><span>완료일</span><i /></div>
        </div>
      </Page>
    </main>
  )
}

export default App
