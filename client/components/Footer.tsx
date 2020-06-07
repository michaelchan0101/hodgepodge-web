import style from 'styles/footer.module.css'

export default function Footer(props: any) {
  const { config } = props
  return (
    <footer className={style.footer}>
      <div>{config.icpTime}</div>
      <div>|</div>
      <div>
        <a href='http://www.beian.miit.gov.cn' target='_blank'>
          {config.icp}
        </a>
      </div>
      <div>|</div>
      <div>{config.email}</div>
    </footer>
  )
}
