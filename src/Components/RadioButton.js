function RadioButton({ label, value, checked }) {
	return (
		<div class="form-control p-0" key={`code_${ value }`}>
			<label class="label cursor-pointer p-3">
				<input type="radio" className="radio radio-primary radio-sm" id={`code_${ value }`} name="code" value={value} defaultChecked={ value === checked ? true : false } required />
				<span class="label-text pl-1" htmlFor={`code_${ value }`}>{ label }</span>
			</label>
		</div>
	);

}

export default RadioButton;
