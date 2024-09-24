interface LogoIconProps {
  fillColor?: string;
}

const StartIcon: React.FC<LogoIconProps> = ({ fillColor = '#FFF' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="dark:hover:text-primary-400 h-5 w-4 hover:text-red-300 dark:text-gray-100 hover:dark:text-red-800"
      viewBox="0 0 1 1080

    "
    >
      <path
        fill={fillColor}
        fillRule="evenodd"
        stroke={fillColor}
        d="M9.5-23.493c0-.821-.671-1.517-1.524-1.475-3.001.145-5.478.947-7.39 2.44-2.148 1.68-3.21 4.037-3.21 7.007v8.395c0 1.65-.503 2.78-1.428 3.501-.815.634-2.12 1.047-3.997 1.174-.79.053-1.451.696-1.451 1.523V.955c0 .837.674 1.48 1.469 1.529 1.698.104 2.969.491 3.859 1.115l.004.003c.994.682 1.544 1.85 1.544 3.648v8.313c0 2.946 1.02 5.284 3.094 6.947 1.856 1.49 4.37 2.294 7.493 2.464.857.047 1.537-.649 1.537-1.477v-1.848c0-.827-.66-1.463-1.439-1.53-1.57-.135-2.742-.538-3.563-1.166-.918-.715-1.427-1.894-1.427-3.664V7.141c0-2.029-.53-3.705-1.64-4.975C.554 1.165-.65.453-2.153.007-.65-.438.555-1.15 1.43-2.15c1.11-1.27 1.641-2.946 1.641-4.975v-8.093c0-1.53.426-2.652 1.216-3.434.798-.791 2.035-1.302 3.787-1.47.772-.075 1.426-.707 1.426-1.53v-1.84z"
        transform="matrix(20.58 0 0 21.33 198.23 534.97)"
        vectorEffect="non-scaling-stroke"
      ></path>
    </svg>
  );
};

const EndIcon: React.FC<LogoIconProps> = ({ fillColor = '#FFF' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="dark:hover:text-primary-400 h-5 w-4 hover:text-red-300 dark:text-gray-100 hover:dark:text-red-800"
      viewBox="0 0 500 1080"
    >
      <path
        fill={fillColor}
        stroke={fillColor}
        d="M-6-28.998c4.934 0 9 4.066 9 9v14c0 1.714 1.286 3 3 3h4v6H6c-1.714 0-3 1.286-3 3v14c0 4.934-4.066 9-9 9h-4v-6h4c1.714 0 3-1.286 3-3v-14c0-2.305.895-4.4 2.344-6C-2.096-1.596-3-3.7-3-5.998v-14c0-1.714-1.286-3-3-3h-4v-6h4z"
        transform="matrix(19.89 0 0 18.43 200.47 537.42)"
        vectorEffect="non-scaling-stroke"
      ></path>
    </svg>
  );
};

export { EndIcon, StartIcon };
