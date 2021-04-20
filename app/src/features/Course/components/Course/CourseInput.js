import React, { lazy, useEffect, useRef, useState, Suspense } from "react";
import {
	TextField,
	Grid,
	Container,
	Typography,
	makeStyles,
	withTheme,
} from "@material-ui/core";

import SectionList from "../Section/SectionList";
import { useSelector } from "react-redux";

import CKViewer from "commons/components/CKEditor/CKViewer";
// import CKEditor from "commons/components/CKEditor/CKEditor";
const CKEditor = lazy(() => import("commons/components/CKEditor/CKEditor"));

// import Prism from "prismjs";


export default function CourseInput({ course, setCourse }) {
	const classes = useStyles();
	// const [intro, setIntro] = useState(
	// 	'<h2><strong>Sử dụng Material-UI trong dự án dùng reactjs</strong></h2><p><br data-cke-filler="true"></p><p style="margin-left:0px;">This post has been more than <strong>3 years</strong> since it was last updated.</p><p>Đối với các lập trình viên thì cái tên boostrap chắc đã quá quen thuộc để làm đẹp trang web của bạn. Trong reactjs thì mọi thứ đều quy ra thành component nên mọi thứ hỗ trợ cho nó cũng chính vì thế mà cũng quy ra component cả. Boostrap cũng không phải ngoại lệ. Boostrap cũng có các hệ thống component để hỗ trợ cho các dự án dùng reactjs. Nhưng hôm nay mình xin giới thiệu một thư viện khác. Hình như là nó sinh ra để đi kèm với react theo mình tới thời điểm hiện tại là như vậy. Ngay từ những dòng introduction đầu tiên thì nó cũng đã khuyên là nên biết react trước khi học về nó. Đó là <a href="http://www.material-ui.com/#/get-started/required-knowledge">Material-UI</a>. Nên bài viết này mình sẽ hướng dẫn các bạn sử dụng nó trong dự án dùng reactjs. Material-UI cũng cấp cho bạn khá đầy đủ các component để có thể tạo ra một trang web một cách nhanh chóng hơn, mà không phải đi ngồi css từng tí một. Rất tiện lợi, chỉ cần cài đặt thư viện này và sử dụng. Tùy theo yêu cầu mà của ta mà custom theo ý minh.</p><h2 style="margin-left:0px;"><strong>Setup Material-UI</strong></h2><p>Material ui thì có sẵn như một <i>npm package</i></p><pre data-language="XML" spellcheck="false"><code class="language-xml">npm install material-ui<br><br data-cke-filler="true"></code></pre><p>khuyên các bạn là nên cài bản ổn định, đừng đi cà bản Pre-release, không có lúc nào mà có lỗi lại khóc lóc&nbsp;</p><figure class="image ck-widget ck-widget_with-resizer" contenteditable="false"><img src="https://twemoji.maxcdn.com/2/72x72/1f603.png" alt="😃"><div class="ck ck-reset_all ck-widget__type-around"><div class="ck ck-widget__type-around__button ck-widget__type-around__button_before" title="Insert paragraph before block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="Insert paragraph after block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__fake-caret"></div></div><figcaption class="ck-editor__editable ck-editor__nested-editable ck-hidden ck-placeholder" data-placeholder="Nhập mô tả ảnh" contenteditable="true"><br data-cke-filler="true"></figcaption><div class="ck ck-reset_all ck-widget__resizer" style="display: none;"><div class="ck-widget__resizer__handle ck-widget__resizer__handle-top-left"></div><div class="ck-widget__resizer__handle ck-widget__resizer__handle-top-right"></div><div class="ck-widget__resizer__handle ck-widget__resizer__handle-bottom-right"></div><div class="ck-widget__resizer__handle ck-widget__resizer__handle-bottom-left"></div><div class="ck ck-size-view" style="display: none;"></div></div></figure><p>. Trong nhiều components của materail-ui sử dụng <a href="https://github.com/zilverline/react-tap-event-plugin">react-tap-event-plugin</a> để lắng nghe các sự kiện như touch/tap/clickevents. Để có thể sử dụng thì chỉ cần thêm</p><pre data-language="JavaScript" spellcheck="false"><code class="language-javascript">import injectTapEventPlugin from \'react-tap-event-plugin\';<br>injectTapEventPlugin();<br><br data-cke-filler="true"></code></pre><p>vào component cha chung to nhất để có thể sử dụng nó ở nhiều nơi và chỉ cần gọi onTouchTap(). ./App.js</p><pre data-language="JavaScript" spellcheck="false"><code class="language-javascript">import React from \'react\';<br>import ReactDOM from \'react-dom\';<br>import MyAwesomeReactComponent from \'./MyAwesomeReactComponent\';<br>import MuiThemeProvider from \'material-ui/styles/MuiThemeProvider\';<br><br>const App = () =&gt; (<br>  &lt;MuiThemeProvider&gt;<br>    &lt;MyAwesomeReactComponent /&gt;<br>  &lt;/MuiThemeProvider&gt;<br>);<br><br>ReactDOM.render(<br>  &lt;App /&gt;,<br>  document.getElementById(\'app\')<br>);<br><br data-cke-filler="true"></code></pre><p>App này sẽ chứa tất cả toàn bộ component của trang web mà mình sẽ làm.</p><h2 style="margin-left:0px;"><strong>Usage</strong></h2><p><strong>Theme</strong> Material-ui cung cấp 2 base theme với background-color là light và dark. Nhìn đoạn code phía trên thì các bạn có thể thấy mình đã sử dụng theme rồi. Chính là đoạn này:</p><pre data-language="JavaScript" spellcheck="false"><code class="language-javascript">import MuiThemeProvider from \'material-ui/styles/MuiThemeProvider\';<br><br>const App = () =&gt; (<br>  &lt;MuiThemeProvider&gt;<br>    &lt;MyAwesomeReactComponent /&gt;<br>  &lt;/MuiThemeProvider&gt;<br>);<br><br data-cke-filler="true"></code></pre><p>Material-UI sử dụng single JS object để gọi muiTheme. Mặc định muiTheme dựa trên lightBaseTheme. muiTheme object chứa các khóa:</p><ul><li>spacing: được sử dụng để thay đổi khoảng cách của các components.</li><li>fontFamily: được sử dụng để thay đổi font family mặc định.</li><li>palette: được sử dụng để thay đổi màu của các component.</li><li>isRtl có thể được sử dụng để cho phép chuyển từ chế độ từ phải sang trái. ... ví dụ:</li></ul><pre data-language="JavaScript" spellcheck="false"><code class="language-javascript">import getMuiTheme from \'material-ui/styles/getMuiTheme\';<br><br>const theme = getMuiTheme({<br>  fontFamily: "Mieryo, \'メイリオ\', sans-serif",<br>  palette: {<br>    primary1Color: "#f49ac1",<br>    accent1Color: "#555555",<br>  },<br>});<br><br>export default theme;<br><br data-cke-filler="true"></code></pre><p><strong>Style</strong> Nếu bạn muốn dùng inline style:</p><pre data-language="JavaScript" spellcheck="false"><code class="language-javascript">import React from \'react\';<br>import Checkbox from \'material-ui/Checkbox\';<br><br>const StylesOverridingInlineExample = () =&gt; (<br>  &lt;Checkbox<br>    name="StylesOverridingInlineExample"<br>    label="Checked the mail"<br>    style={{<br>      width: \'50%\',<br>      margin: \'0 auto\',<br>      border: \'2px solid #FF9800\',<br>      backgroundColor: \'#ffd699\',<br>    }}<br>  /&gt;<br>);<br><br>export default StylesOverridingInlineExample;<br><br data-cke-filler="true"></code></pre><p>Còn nếu ban muốn viết css riêng cho một component nào của react thì hãy đặt className cho component đó và viết ra file css bình thường. Nhưng có một chú ý là để có thể css lại cho 1 component mà ko dùng inline style thì các bạn phải dùng !impotant thì css mới nhận nhé.</p><p><strong>Icon</strong> Hiện tại thì trong dụ án của mình đang dùng bộ icon của <a href="https://material.io/icons/">material icons</a>. Mình thấy nó cũng khá là đầy đủ. dể sử dụng và cũng đẹp mắt. Nó cũng dễ dàng cài đặt và sử dụng. Các bạn xem thêm trong component Icons của material-ui.</p><h2 style="margin-left:0px;"><strong>conclusion</strong></h2><p>Sau khi sử dụng materail ui với reactjs thì mình thấy nó khá là tiện dụng. Các bạn nào mới bắt đầu với react thì hãy dùng thử nó. Có 2 <a href="https://github.com/callemall/material-ui/tree/master/examples">example</a> được dùng với webpack và browserify do material cung cấp. Các bạn có thể clone về và xem thử nó thú vị hay không. Hi vọng sau khi sử dụng các bạn sẽ thích nó. Mọi ý kiến xin các bạn để lại ở phần comment bên dưới. Cảm ơn đã ghé qua.</p><h2 style="margin-left:0px;"><strong>references</strong></h2><p><a href="http://www.material-ui.com/">http://www.material-ui.com</a> <a href="https://material.io/icons">https://material.io/icons</a>⁠⁠⁠⁠⁠⁠⁠</p>'
	// );
	// '<pre><code class="language-javascript">const i = 12;</code></pre><p><code>dasdsad</code></p><figure class="table"><table><tbody><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>'

	const setSections = (sections) => {
		setCourse({ ...course, sections: sections });
	};

	const introHandler = (data) => {
		setCourse({ ...course, introduce: data });
	};

	return (
		<Container maxWidth="xl">
			<form>
				<Grid container spacing={1} direction="row" justify="space-around">
					<Grid
						item
						md={9}
						sm={12}
						container
						spacing={2}
						justify="center"
						alignItems="center"
					>
						<Grid container item md={12} xs={10}>
							<Typography variant="subtitle1" color="initial">
								Tên khóa học
							</Typography>
							<TextField
								className={classes.textField}
								id="name"
								variant="outlined"
								fullWidth
								value={course.title}
								onChange={(e) =>
									setCourse({ ...course, title: e.target.value })
								}
							/>
						</Grid>
						<Grid container alignItems="stretch" item md={12} xs={10}>
							<Typography variant="subtitle1" color="initial">
								Giới thiệu khóa học
							</Typography>
							<Grid item md={12} xs={12}>
								<Suspense fallback={<div>Loading...</div>}>
									<CKEditor content={course.introduce} handler={introHandler} />
								</Suspense>
							</Grid>

							{/* <Grid item xs={12}>
								<CKViewer content='<p>dasdsaddsadsadsadsad sad asd asda sdas as sa dsasadsasdsd assa s adsasa</p><figure class="image ck-widget ck-widget_with-resizer image_resized" contenteditable="false" style="width:69.21%;"><img src="http://localhost:8088/storage/uploads/d6c4355b-dfb0-4e64-9acc-ae2b6f5038cc.png"><div class="ck ck-reset_all ck-widget__type-around"><div class="ck ck-widget__type-around__button ck-widget__type-around__button_before" title="Insert paragraph before block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="Insert paragraph after block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__fake-caret"></div></div><figcaption class="ck-editor__editable ck-editor__nested-editable ck-placeholder ck-hidden" data-placeholder="Nhập mô tả ảnh" contenteditable="true"><br data-cke-filler="true"></figcaption><div class="ck ck-reset_all ck-widget__resizer" style="height: 145px; left: 0px; top: 0px; width: 400px; display: none;"><div class="ck-widget__resizer__handle ck-widget__resizer__handle-top-left"></div><div class="ck-widget__resizer__handle ck-widget__resizer__handle-top-right"></div><div class="ck-widget__resizer__handle ck-widget__resizer__handle-bottom-right"></div><div class="ck-widget__resizer__handle ck-widget__resizer__handle-bottom-left"></div><div class="ck ck-size-view ck-orientation-bottom-right" style="display: none;">69.21%</div></div></figure><p>dasdsadsdsadasdsadsadasdsadsadsadsadsadsadsadsadsa sad sa dsad sa sad&nbsp;</p><pre data-language="JavaScript" spellcheck="false"><code class="language-javascript">const a = 1;</code></pre>' />
							</Grid> */}
						</Grid>
						<Grid
							container
							alignItems="stretch"
							direction="column"
							item
							md={12}
							xs={10}
						>
							<Typography align="left" variant="subtitle1" color="initial">
								Chương học
							</Typography>
							<Grid item container md={12} direction="column">
								<SectionList
									sections={course.sections}
									setSections={setSections}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						md={3}
						sm={12}
						container
						spacing={1}
						className={classes.panel}
					>
						Right Bar
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

const useStyles = makeStyles((theme) => ({
	textField: {
		backgroundColor: "white",
	},
	panel: {
		backgroundColor: "#cfe8fc",
	},
}));
