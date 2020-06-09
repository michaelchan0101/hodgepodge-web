import style from 'styles/footer.module.css'

export default function Footer(props: any) {
  return (
    <footer className={style.footer}>
      <div>{process.env.icpTime}</div>
      <div>|</div>
      <div>
        <a href='http://www.beian.miit.gov.cn' target='_blank'>
          {process.env.icp}
        </a>
      </div>
      <div>|</div>
      <div>{process.env.email}</div>
    </footer>
  )
}
