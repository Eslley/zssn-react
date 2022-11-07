function PageTitle({ icon, title, helper}) {
    return (
        <h4 style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '26px'
        }}>
            {icon}
            {title}
            <div style={{ justifySelf: 'end' }}>
                {helper}
            </div>
        </h4>
    )
}

export default PageTitle