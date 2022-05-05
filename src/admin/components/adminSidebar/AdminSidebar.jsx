import "./adminSidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@material-ui/icons";
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";


const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Tablero de Administrador</h3>
                    <ul className="sidebarList">
                        <Link to="/admin" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Pagina principal
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Usuarios
                            </li>
                        </Link>
                        <Link to="/adminProducts" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Productos
                            </li>
                        </Link>
                        <Link to="/newProduct" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Nuevo Producto
                            </li>
                        </Link>
                        <Link to="/ventas" className="link">
                            <li className="sidebarListItem">
                                <AttachMoney className="sidebarIcon" />
                                ventas
                            </li>
                        </Link>
                        <Link to="/appSettings" className="link">
                            <li className="sidebarListItem">
                                <SettingsIcon className="sidebarIcon" />
                                Ajustes
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Mascotas</h3>
                    <ul className="sidebarList">
                        <Link to="/publicPets" className="link" >
                            <li className="sidebarListItem">
                                <DynamicFeed className="sidebarIcon" />
                                Publicaciones de Mascotas
                            </li>
                        </Link>
                        <Link to="/newPublicPets" className="link" >
                            <li className="sidebarListItem">
                                <DynamicFeed className="sidebarIcon" />
                                Nueva Publicaciones de Mascotas
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
