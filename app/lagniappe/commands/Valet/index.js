import { exec } from 'child_process'

export default class Index
{

    start()
    {
        exec('valet start')
    }

    stop()
    {
        exec('valet stop')
    }

    restart()
    {
        exec('valet restart')
    }

    install()
    {
        exec('valet install')
    }

    uninstall()
    {
        exec('valet uninstall')
    }

}
